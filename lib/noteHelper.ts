import dayjs from 'dayjs'
import slugify from 'slugify'

import { Post, PostDate } from '@/types'

type NoteProps = {
  title: string
  createdAt: string
  publishedAt?: string | null
  permalink?: string | null
}

type NoteFrontmatter = {
  date?: PostDate | Date | string
  slug?: string | null
}

const isPostDate = (value: unknown): value is PostDate => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.year === 'string' &&
    typeof candidate.month === 'string' &&
    typeof candidate.day === 'string'
  )
}

export function getDateFromNote(
  note: NoteProps,
  meta: NoteFrontmatter,
): PostDate {
  const toPostDate = (value: dayjs.Dayjs): PostDate => {
    const [year, month, day] = value.format('YYYY/MM/DD').split('/')
    return {
      year,
      month,
      day,
    }
  }

  if (meta.date) {
    if (isPostDate(meta.date)) {
      return meta.date
    }

    return toPostDate(dayjs(meta.date))
  }

  if (note.publishedAt) {
    return toPostDate(dayjs(note.publishedAt))
  }

  return toPostDate(dayjs(note.createdAt))
}

export const getDayjs = ({ year, month, day }: PostDate) => {
  return dayjs(`${year}-${month}-${day}`)
}

export function sortPostByDate(a: { date: PostDate }, b: { date: PostDate }) {
  return getDayjs(b.date).isAfter(getDayjs(a.date)) ? 1 : -1
}

export function getSlugFromNote(note: NoteProps, meta: NoteFrontmatter) {
  return meta.slug || note.permalink || slugify(note.title)
}

export function filterNotDraft(post: Post) {
  return !post.tags?.includes('draft') && (post.meta?.date || post.publishedAt)
}
