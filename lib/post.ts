import fg from 'fast-glob'
import * as fs from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import shorthash from 'shorthash'

import { config } from '@/lib/config'
import { Post, PostDate, PostMeta, PostPreview } from '@/types'

import { parseMeta } from './markdown'
import {
  filterNotDraft,
  getDateFromNote,
  getSlugFromNote,
  sortPostByDate,
} from './noteHelper'

type NoteFrontmatter = {
  date?: string | Date | PostDate
  image?: string
  slug?: string | null
}

type HackmdNote = {
  createdAt: string
  id: string
  permalink?: string | null
  publishedAt?: string | null
  tags: string[]
  title: string
}

type HackmdOverviewResponse = {
  notes?: HackmdNote[]
}

type CachedPost = Pick<Post, 'content' | 'id' | 'meta' | 'title'>

type PostParams = PostDate & {
  slug: string
}

type PostMetaWithSlug = PostMeta & {
  slug?: string | null
}

const cachedDir = path.join(process.cwd(), './.next/cache/posts/')
const notesCachedDir = path.join(process.cwd(), './.next/cache/notes/')

export const POSTS_REVALIDATE_SECONDS = 300

const FETCH_RETRY_ATTEMPTS = 3

try {
  fs.mkdirSync(cachedDir, { recursive: true })
  fs.mkdirSync(notesCachedDir, { recursive: true })
} catch (error) {
  console.error(error)
}

const writeCacheFile = (filePath: string, content: string): void => {
  try {
    fsExtra.ensureDirSync(path.dirname(filePath))
    fsExtra.writeFileSync(filePath, content, 'utf8')
  } catch {
    // The runtime filesystem may be read-only; cache writes are best-effort only.
  }
}

const isPost = (post: Post | null): post is Post => {
  return post !== null
}

const getHashedKey = (
  year: string,
  month: string,
  day: string,
  slug: string,
): string => {
  return shorthash.unique(`${year}-${month}-${day}-${slug}`)
}

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const withRetry = async <T>(
  callback: () => Promise<T>,
  attempts = FETCH_RETRY_ATTEMPTS,
): Promise<T> => {
  let lastError: unknown

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await callback()
    } catch (error) {
      lastError = error

      if (attempt < attempts) {
        await sleep(attempt * 250)
      }
    }
  }

  throw lastError
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

const normalizePostMeta = (frontmatter: NoteFrontmatter): PostMetaWithSlug => {
  return {
    date: normalizeMetaDate(frontmatter.date),
    image: frontmatter.image,
    slug: frontmatter.slug,
  }
}

const normalizePublishedAt = (publishedAt?: string | null): string => {
  return publishedAt ?? ''
}

export const fetchPostData = async (
  noteId: string,
): Promise<string | undefined> => {
  if (!noteId) {
    return undefined
  }

  const encodedId = encodeURIComponent(noteId)
  const notePath = path.join(notesCachedDir, `${encodedId}.md`)

  try {
    const fullContent = await withRetry(() =>
      fetch(`${config.hackmdBaseUrl}/${noteId}/download`, {
        next: { revalidate: POSTS_REVALIDATE_SECONDS },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch note ${noteId}: ${response.status} ${response.statusText}`,
          )
        }

        return response.text()
      }),
    )

    writeCacheFile(notePath, fullContent)

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
        return JSON.parse(fsExtra.readFileSync(entry, 'utf-8')) as Post
      } catch {
        return null
      }
    })
    .filter(isPost)
    .filter(filterNotDraft)
    .sort(sortPostByDate)
}

const getCachedPostFilename = (post: Post): string => {
  const { date } = post

  return `${getHashedKey(date.year, date.month, date.day, post.slug)}.json`
}

const writePostsToCache = async (posts: Post[]): Promise<void> => {
  try {
    fsExtra.ensureDirSync(cachedDir)

    const currentEntries = await fg(`${cachedDir}/*.json`)
    const nextEntries = new Set<string>()

    posts.forEach((post) => {
      if (!post.note) {
        return
      }

      const filename = getCachedPostFilename(post)
      nextEntries.add(filename)
      const filePath = path.join(cachedDir, filename)
      const tempFilePath = `${filePath}.tmp`

      fsExtra.writeFileSync(
        tempFilePath,
        JSON.stringify(
          {
            id: post.note.id,
            meta: post.meta,
            title: post.note.title,
            content: post.content,
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
  } catch {
    // Keep runtime requests working when the deployment filesystem is read-only.
  }
}

const serializePosts = (posts: Post[]): Post[] => {
  return JSON.parse(JSON.stringify(posts)) as Post[]
}

const fetchOverviewNotes = async (): Promise<HackmdNote[]> => {
  const data = await withRetry(() =>
    fetch(
      `${config.hackmdBaseUrl}/api/@${process.env.HACKMD_PROFILE}/overview`,
      {
        next: { revalidate: POSTS_REVALIDATE_SECONDS },
      },
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch post overview: ${response.status} ${response.statusText}`,
        )
      }

      return response.json() as Promise<HackmdOverviewResponse>
    }),
  )

  return data.notes ?? []
}

export const getAllPostsWithSlug = async (): Promise<Post[]> => {
  const cachedPosts = await readCachedPosts()

  try {
    const notes = await fetchOverviewNotes()

    const posts = (
      await Promise.all(
        notes.map(async (note): Promise<Post | null> => {
          const fullContent = await fetchPostData(note.id)

          if (!fullContent) {
            return null
          }

          const { data, content } = parseMeta<NoteFrontmatter>(fullContent)
          const meta = normalizePostMeta(data)
          const slug = getSlugFromNote(note, data)

          return {
            id: note.id,
            meta,
            content,
            note: {
              id: note.id,
              title: note.title,
            },
            title: note.title,
            date: getDateFromNote(note, data),
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

export const toPostPreview = (post: Post): PostPreview => {
  const { content: _content, ...postPreview } = post
  return postPreview
}

export const formatPostsAsParams = (
  posts: Post[],
): Array<{ params: PostParams }> => {
  return posts.map((post) => ({
    params: {
      ...post.date,
      slug: post.slug,
    },
  }))
}

export const getPostData = async (
  params: PostParams,
): Promise<CachedPost | null> => {
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
  const cachedPostPath = path.join(cachedDir, `${filename}.json`)

  if (!fsExtra.existsSync(cachedPostPath)) {
    return null
  }

  const cachedPost = JSON.parse(
    fsExtra.readFileSync(cachedPostPath, 'utf-8'),
  ) as CachedPost

  return {
    id: cachedPost.id,
    content: cachedPost.content,
    title: cachedPost.title,
    meta: cachedPost.meta,
  }
}
