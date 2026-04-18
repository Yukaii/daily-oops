import dayjs from 'dayjs'
import slugify from 'slugify'

import { Post } from '@/types'

export type DateType = {
  year: string
  month: string
  day: string
}

const isDateType = (value: unknown): value is DateType => {
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

type NoteProps = {
  title: string
  createdAt: string
  publishedAt?: string | null
  permalink?: string | null
}

type NoteMeta = {
  date?: DateType | Date | string
  slug?: string | null
}

export function getDateFromNote(note: NoteProps, meta: NoteMeta): DateType {
  const p = (dayjs: dayjs.Dayjs) => {
    const [year, month, day] = dayjs.format('YYYY/MM/DD').split('/')
    return {
      year,
      month,
      day,
    }
  }

  if (meta.date) {
    if (isDateType(meta.date)) {
      return meta.date
    }

    return p(dayjs(meta.date))
  } else if (note.publishedAt) {
    return p(dayjs(note.publishedAt))
  } else {
    return p(dayjs(note.createdAt))
  }
}

export const getDayjs = ({ year, month, day }: DateType) => {
  return dayjs(`${year}-${month}-${day}`)
}

export function sortPostByDate(a: { date: DateType }, b: { date: DateType }) {
  return getDayjs(b.date).isAfter(getDayjs(a.date)) ? 1 : -1
}

export function getSlugFromNote(note: NoteProps, meta: NoteMeta) {
  return meta.slug || note.permalink || slugify(note.title)
}

export function filterNotDraft(post: Post) {
  return !post.tags?.includes('draft') && (post.meta?.date || post.publishedAt)
}
