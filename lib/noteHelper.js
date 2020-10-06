import dayjs from 'dayjs'
import slugify from 'slugify'

export function getDateFromNote(note, meta) {
  const p = dayjs => {
    const [year, month, day] = dayjs.format('YYYY/MM/DD').split('/')
    return {
      year, month, day
    }
  }

  if (meta.date) {
    return p(dayjs(meta.date))
  } else if (note.publishedAt) {
    return p(dayjs(note.publishedAt))
  } else {
    return p(dayjs(note.createdAt))
  }
}

export function getSlugFromNote(note, meta) {
  return meta.slug || note.permalink || slugify(note.title)
}

export function filterNotDraft (post) {
  return !post.tags?.includes('draft') && (post.meta?.date || post.publishedAt)
}
