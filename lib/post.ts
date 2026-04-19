import { cache } from 'react'

import { config } from '@/lib/config'
import {
  Post,
  PostMeta,
  PostParams,
  PostPreview,
  SearchablePostPreview,
} from '@/types'

import { parseMeta } from './markdown'
import {
  filterNotDraft,
  getDateFromNote,
  getSlugFromNote,
  sortPostByDate,
} from './noteHelper'

type NoteFrontmatter = {
  date?: string | Date | Post['date']
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

type PostMetaWithSlug = PostMeta & {
  slug?: string | null
}

export const POSTS_REVALIDATE_SECONDS = 300

const FETCH_RETRY_ATTEMPTS = 3

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

const fetchText = async (url: string): Promise<string> => {
  return withRetry(() =>
    fetch(url, {
      next: { revalidate: POSTS_REVALIDATE_SECONDS },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
        )
      }

      return response.text()
    }),
  )
}

const fetchJson = async <T>(url: string): Promise<T> => {
  return withRetry(() =>
    fetch(url, {
      next: { revalidate: POSTS_REVALIDATE_SECONDS },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
        )
      }

      return response.json() as Promise<T>
    }),
  )
}

export const fetchPostData = cache(async (noteId: string) => {
  if (!noteId) {
    return undefined
  }

  return fetchText(`${config.hackmdBaseUrl}/${noteId}/download`)
})

const fetchOverviewNotes = cache(async (): Promise<HackmdNote[]> => {
  const profile = process.env.HACKMD_PROFILE

  if (!profile) {
    throw new Error('HACKMD_PROFILE is not configured')
  }

  const data = await fetchJson<HackmdOverviewResponse>(
    `${config.hackmdBaseUrl}/api/@${profile}/overview`,
  )

  return data.notes ?? []
})

export const getAllPostsWithSlug = cache(async (): Promise<Post[]> => {
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
    .filter((post): post is Post => post !== null)
    .filter(filterNotDraft)

  return posts.sort(sortPostByDate)
})

export const toPostPreview = (post: Post): PostPreview => {
  const { content: _content, ...postPreview } = post
  return postPreview
}

const SEARCH_TEXT_LIMIT = 320

const toSearchText = (content: string): string => {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, ' $1 ')
    .replace(/[#>*_~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, SEARCH_TEXT_LIMIT)
}

export const toSearchablePostPreview = (post: Post): SearchablePostPreview => {
  return {
    ...toPostPreview(post),
    searchText: toSearchText(post.content),
  }
}

export const formatPostsAsParams = (posts: Post[]): PostParams[] => {
  return posts.map((post) => ({
    ...post.date,
    slug: post.slug,
  }))
}

export const getPostData = cache(
  async (params: PostParams): Promise<CachedPost | null> => {
    const posts = await getAllPostsWithSlug()
    const post = posts.find((entry) => {
      return (
        entry.slug === params.slug &&
        entry.date.year === params.year &&
        entry.date.month === params.month &&
        entry.date.day === params.day
      )
    })

    if (!post) {
      return null
    }

    return {
      id: post.id,
      content: post.content,
      title: post.title,
      meta: post.meta,
    }
  },
)
