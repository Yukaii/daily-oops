import fs from 'fs-extra'
import path from 'path'
import got from 'got'
import fg from 'fast-glob'

import * as Promise from 'bluebird'

const shorthash = require('shorthash')

import { parseMeta } from './markdown'
import { getDateFromNote, getSlugFromNote, filterNotDraft } from './noteHelper'

const cachedDir = path.join(process.cwd(), './.next/cache/posts')
fs.ensureDirSync(cachedDir)

const getHashedKey = (year, month, day, slug) => {
  return shorthash.unique(`${year}-${month}-${day}-${slug}`)
}

export const getAllPostsWithSlug = async () => {
  // cached json results
  const currentEntries = await fg(`${cachedDir}/*.json`)
  if (currentEntries.length > 0) {
    return currentEntries.map(entry => {
      return JSON.parse(fs.readFileSync(entry, 'utf-8'))
    }).filter(filterNotDraft)
  }

  const data = await got(`https://hackmd.io/api/@${process.env.HACKMD_PROFILE}/overview`).json()

  const posts = (await Promise.map(data.notes || [], async note => {
    const r = await got(`https://hackmd.io/${note.id}/download`)
    const fullContent = r.body

    if (!fullContent) {
      return null
    }

    const { data: meta, content } = parseMeta(fullContent)
    note.content = content
    const slug = getSlugFromNote(note, meta)

    return {
      meta,
      content,
      note,
      date: getDateFromNote(note, data),
      slug,
      tags: note.tags,
      publishedAt: note.publishedAt
    }
  })).filter(Boolean).filter(filterNotDraft)

  posts.forEach(post => {
    const { date } = post
    const filename = getHashedKey(date.year, date.month, date.day, post.slug)

    fs.writeFileSync(path.join(cachedDir, `${filename}.json`), JSON.stringify({
      id: post.note.id,
      meta: post.meta,
      title: post.note.title,
      content: post.content,
      date: post.date,
      slug: post.slug,
      tags: post.tags,
      publishedAt: post.publishedAt
    }, null, 2), 'utf-8')
  })

  return posts
}

export const formatPostsAsParams = (posts) => {
  return posts.map(post => ({
    params: {
      ...post.date,
      slug: post.slug
    }
  }))
}

export const getPostData = async (params) => {
  const filename = getHashedKey(params.year, params.month, params.day, params.slug)
  const post = JSON.parse(fs.readFileSync(path.join(cachedDir, `${filename}.json`), 'utf-8'))

  return {
    content: post.content,
    title: post.title
  }
}
