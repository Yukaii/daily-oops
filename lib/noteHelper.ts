import dayjs from 'dayjs'
import slugify from 'slugify'

import { Post } from '@/types'

type NoteProps = {
  title: string
  createdAt: string
  publishedAt: string
  permalink: string
}

type DateType = {
  year: string
  month: string
  day: string
}

type DateProps = {
  date: DateType | Date
  slug: string
}

export function getDateFromNote(note: NoteProps, meta: DateProps) {
  const p = (dayjs: dayjs.Dayjs) => {
    const [year, month, day] = dayjs.format('YYYY/MM/DD').split('/')
    return {
      year,
      month,
      day,
    }
  }

  if (meta.date) {
    //@ts-ignore
    return p(dayjs(meta.date)) // TODO: TS support
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

export function getSlugFromNote(note: NoteProps, meta: DateProps) {
  return meta.slug || note.permalink || slugify(note.title)
}

export function filterNotDraft(post: Post) {
  return !post.tags?.includes('draft') && (post.meta?.date || post.publishedAt)
}
