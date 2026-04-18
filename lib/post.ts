import fg from 'fast-glob'
import * as fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'

import { getHackMDClient } from '@/lib/hackmd'
import { Post } from '@/types'

const shorthash = require('shorthash')

import { parseMeta } from './markdown'
import {
  DateType,
  filterNotDraft,
  getDateFromNote,
  getSlugFromNote,
  sortPostByDate,
} from './noteHelper'

const cachedDir = path.join(process.cwd(), './.next/cache/posts/')
const notesCachedDir = path.join(process.cwd(), './.next/cache/notes/')
export const POSTS_REVALIDATE_SECONDS = 300

try {
  fs.mkdirSync(cachedDir, { recursive: true })
  fs.mkdirSync(notesCachedDir, { recursive: true })
} catch (err) {
  console.error(err)
}

const getHashedKey = (
  year: string,
  month: string,
  day: string,
  slug: string,
) => {
  return shorthash.unique(`${year}-${month}-${day}-${slug}`)
}

type NoteFrontmatter = {
  date?: string | Date | DateType
  image?: string
  slug?: string | null
}

type PostMeta = Post['meta'] & {
  slug?: string | null
}

const isPost = (post: Post | null): post is Post => {
  return post !== null
}

const normalizeMetaDate = (date: NoteFrontmatter['date']): string => {
  if (typeof date === 'string') {
    return date
  }

  if (date instanceof Date) {
    return date.toISOString()
  }

  if (date) {
    return `${date.year}-${date.month}-${date.day}`
  }

  return ''
}

const normalizePostMeta = (frontmatter: NoteFrontmatter): PostMeta => {
  return {
    date: normalizeMetaDate(frontmatter.date),
    image: frontmatter.image,
    slug: frontmatter.slug,
  }
}

const normalizePublishedAt = (publishedAt?: string | null) => publishedAt || ''

const getNoteContent = async (noteId: string) => {
  const note = await getHackMDClient().getNote(noteId)
  return note.content
}

export const fetchPostData = async (noteId: string) => {
  if (!noteId) {
    return
  }

  const encodedId = encodeURIComponent(noteId)
  const notePath = path.join(notesCachedDir, `${encodedId}.md`)

  try {
    const fullContent = await getNoteContent(noteId)

    fsExtra.writeFileSync(notePath, fullContent, 'utf8')

    return fullContent
  } catch (error) {
    if (fsExtra.existsSync(notePath)) {
      return fsExtra.readFileSync(notePath, 'utf8')
    }

    throw error
  }
}

const readCachedPosts = async (): Promise<Post[]> => {
  const currentEntries = await fg(`${cachedDir}/*.json`)

  return currentEntries
    .map((entry) => {
      try {
        return JSON.parse(fsExtra.readFileSync(entry, 'utf-8'))
      } catch (error) {
        return null
      }
    })
    .filter(Boolean)
    .filter(filterNotDraft)
    .sort(sortPostByDate)
}

const getCachedPostFilename = (post: Post) => {
  const { date } = post

  return `${getHashedKey(date.year, date.month, date.day, post.slug)}.json`
}

const writePostsToCache = async (posts: Post[]): Promise<void> => {
  const currentEntries = await fg(`${cachedDir}/*.json`)
  const nextEntries = new Set<string>()

  posts.forEach((post: Post) => {
    const filename = getCachedPostFilename(post)
    nextEntries.add(filename)
    const filePath = path.join(cachedDir, filename)
    const tempFilePath = `${filePath}.tmp`

    fsExtra.writeFileSync(
      tempFilePath,
      JSON.stringify(
        {
          id: post.note!.id,
          meta: post.meta,
          title: post.note!.title,
          content: post?.content,
          date: post.date,
          slug: post.slug,
          tags: post.tags,
          publishedAt: post.publishedAt,
        },
        null,
        2,
      ),
      'utf-8',
    )
    fsExtra.moveSync(tempFilePath, filePath, { overwrite: true })
  })

  currentEntries.forEach((entry) => {
    if (!nextEntries.has(path.basename(entry))) {
      fsExtra.removeSync(entry)
    }
  })
}

const serializePosts = (posts: Post[]): Post[] => {
  return JSON.parse(JSON.stringify(posts)) as Post[]
}

export const getAllPostsWithSlug = async (): Promise<Post[]> => {
  const cachedPosts = await readCachedPosts()

  try {
    const notes = await getHackMDClient().getNoteList()

    const posts = (
      await Promise.all(
        notes.map(async (note): Promise<Post | null> => {
          const fullContent = await fetchPostData(note.id)
          if (!fullContent) {
            return null
          }

          const { data, content } = parseMeta(fullContent)
          const frontmatter = data as NoteFrontmatter
          const meta = normalizePostMeta(frontmatter)
          const slug = getSlugFromNote(note, frontmatter)

          return {
            id: note.id,
            meta,
            content,
            note,
            title: note.title,
            date: getDateFromNote(note, frontmatter),
            slug,
            tags: note.tags,
            publishedAt: normalizePublishedAt(note.publishedAt),
          }
        }),
      )
    )
      .filter(isPost)
      .filter(filterNotDraft)

    const sortedPosts = posts.sort(sortPostByDate)
    const serializedPosts = serializePosts(sortedPosts)
    await writePostsToCache(serializedPosts)

    return serializedPosts
  } catch (error) {
    if (cachedPosts.length > 0) {
      return cachedPosts
    }

    throw error
  }
}

export const formatPostsAsParams = (posts: Post[]) => {
  return posts.map((post) => ({
    params: {
      ...post.date,
      slug: post.slug,
    },
  }))
}

export const getPostData = async (params: {
  year: string
  month: string
  day: string
  slug: string
}) => {
  const posts = await getAllPostsWithSlug()
  const post = posts.find((entry) => {
    return (
      entry.slug === params.slug &&
      entry.date.year === params.year &&
      entry.date.month === params.month &&
      entry.date.day === params.day
    )
  })

  if (post) {
    return {
      id: post.id,
      content: post.content,
      title: post.title,
      meta: post.meta,
    }
  }

  const filename = getHashedKey(
    params.year,
    params.month,
    params.day,
    params.slug,
  )

  if (!fsExtra.existsSync(path.join(cachedDir, `${filename}.json`))) {
    return null
  }

  const cachedPost = JSON.parse(
    fsExtra.readFileSync(path.join(cachedDir, `${filename}.json`), 'utf-8'),
  )

  return {
    id: cachedPost.id,
    content: cachedPost?.content,
    title: cachedPost?.title,
    meta: cachedPost?.meta,
  }
}
