import dayjs from '@/lib/dayjs'
import {
  AppLocale,
  getDayjsLocale,
  getLocalizedPath,
  getMessages,
} from '@/lib/i18n'
import { getAllPostsWithSlug, toSearchablePostPreview } from '@/lib/post'
import { SearchablePostPreview } from '@/types'

export type SearchIndexItem = {
  href: string
  id: string
  kind: 'page' | 'post'
  meta: string
  searchText: string
  tags?: string[]
  title: string
}

const toSearchItem = (
  post: SearchablePostPreview,
  locale: AppLocale,
): SearchIndexItem => {
  const {
    date: { year, month, day },
    slug,
  } = post

  return {
    id: post.id,
    title: post.title,
    meta: dayjs(`${year}-${month}-${day}`)
      .locale(getDayjsLocale(locale))
      .format('LL'),
    href: getLocalizedPath(`/blog/${year}/${month}/${day}/${slug}`, locale),
    kind: 'post',
    searchText: post.searchText,
    tags: post.tags,
  }
}

export async function getSearchIndexItems(
  locale: AppLocale,
): Promise<SearchIndexItem[]> {
  const copy = getMessages(locale)
  const posts = (await getAllPostsWithSlug()).map(toSearchablePostPreview)

  const pageItems: SearchIndexItem[] = [
    {
      id: 'page-home',
      title: copy.nav.home,
      meta: copy.siteSearch.pageLabel,
      href: getLocalizedPath('/', locale),
      kind: 'page',
      searchText: copy.home.description,
    },
    {
      id: 'page-blog',
      title: copy.nav.blog,
      meta: copy.siteSearch.pageLabel,
      href: getLocalizedPath('/blog', locale),
      kind: 'page',
      searchText: copy.pages.blogTitle,
    },
    {
      id: 'page-projects',
      title: copy.nav.projects,
      meta: copy.siteSearch.pageLabel,
      href: getLocalizedPath('/projects', locale),
      kind: 'page',
      searchText: copy.pages.projectsTitle,
    },
    {
      id: 'page-about',
      title: copy.nav.about,
      meta: copy.siteSearch.pageLabel,
      href: getLocalizedPath('/about', locale),
      kind: 'page',
      searchText: copy.pages.aboutTitle,
    },
  ]

  return [...pageItems, ...posts.map((post) => toSearchItem(post, locale))]
}
