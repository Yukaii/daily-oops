import * as Promise from 'bluebird'
// import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'

import { config } from '@/lib/config'
import { Post } from '@/types'

const shorthash = require('shorthash')

import { parseMeta } from './markdown'
import {
  filterNotDraft,
  getDateFromNote,
  getSlugFromNote,
  sortPostByDate,
} from './noteHelper'

// const cachedDir = path.join(process.cwd(), './.next/cache/posts')
// const notesCachedDir = path.join(process.cwd(), './.next/cache/notes')

// fs.ensureDirSync(cachedDir)
// fs.ensureDirSync(notesCachedDir)

const getHashedKey = (
  year: string,
  month: string,
  day: string,
  slug: string
) => {
  return shorthash.unique(`${year}-${month}-${day}-${slug}`)
}

export const fetchPostData = async (noteId: string) => {
  if (!noteId) {
    return
  }

  // const encodedId = encodeURIComponent(noteId)
  // const notePath = path.join(notesCachedDir, `${encodedId}.md`)

  // if (fs.existsSync(notePath)) {
  //   return fs.readFileSync(notePath, 'utf8')
  // }

  const fullContent = await fetch(
    `${config.hackmdBaseUrl}/${noteId}/download`,
    {
      next: { revalidate: 30 },
    }
  ).then((r) => r.text())

  // fs.writeFileSync(notePath, fullContent, 'utf8')

  return fullContent
}

export const getAllPostsWithSlug = async () => {
  // cached json results
  // const currentEntries = await fg(`${cachedDir}/*.json`)
  // if (currentEntries.length > 0) {
  //   return currentEntries
  //     .map((entry) => {
  //       return JSON.parse(fs.readFileSync(entry, 'utf-8'))
  //     })
  //     .filter(filterNotDraft)
  //     .sort(sortPostByDate)
  // }

  const data = await fetch(
    `${config.hackmdBaseUrl}/api/@${process.env.HACKMD_PROFILE}/overview`,
    { next: { revalidate: 30 } }
  ).then((r) => r.json())

  //@ts-ignore // TODO: TS support
  const posts = await Promise.map(data.notes || [], async (note) => {
    const fullContent = await fetchPostData(note.id)
    if (!fullContent) {
      return null
    }

    const { data: meta, content } = parseMeta(fullContent)
    note.content = content
    //@ts-ignore // TODO: TS support
    const slug = getSlugFromNote(note, meta)

    return {
      id: note.id,
      meta,
      content,
      note,
      title: note.title,
      //@ts-ignore // TODO: TS support
      date: getDateFromNote(note, meta),
      slug,
      tags: note.tags,
      publishedAt: note.publishedAt,
    }
  })
    .filter(Boolean)
    .filter(filterNotDraft)

  // posts.forEach((post: Post) => {
  // const { date } = post
  // const filename = getHashedKey(date.year, date.month, date.day, post.slug)

  // console.log(post.date)

  //   fs.writeFileSync(
  //     path.join(cachedDir, `${filename}.json`),
  //     JSON.stringify(
  //       {
  //         id: post.note!.id,
  //         meta: post.meta,
  //         title: post.note!.title,
  //         content: post?.content,
  //         date: post.date,
  //         slug: post.slug,
  //         tags: post.tags,
  //         publishedAt: post.publishedAt,
  //       },
  //       null,
  //       2
  //     ),
  //     'utf-8'
  //   )
  // })

  return posts.sort(sortPostByDate)
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
  // const filename = getHashedKey(
  //   params.year,
  //   params.month,
  //   params.day,
  //   params.slug
  // )

  const posts = await getAllPostsWithSlug()

  const post = posts.find((post: Post) => {
    return post.slug === params.slug
  })

  // const post = JSON.parse(
  //   fs.readFileSync(path.join(cachedDir, `${filename}.json`), 'utf-8')
  // )

  return {
    id: post.id,
    content: post?.content,
    title: post?.title,
    meta: post?.meta,
  }
}
