import type { Metadata } from 'next'

import {
  getBlogPostStaticParams,
  getPostPageMetadata,
  PostPage,
} from '@/app/_components/content-pages'
import { PostParams } from '@/types'

type PageProps = {
  params: Promise<PostParams>
}

export const revalidate = 300

export async function generateStaticParams() {
  return getBlogPostStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return getPostPageMetadata('zh-TW', await params)
}

export default async function Page({ params }: PageProps) {
  return <PostPage locale="zh-TW" params={await params} />
}
