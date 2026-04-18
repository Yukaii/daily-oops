export interface OldProject {
  title: string
  description: string
  link: string
  image: string
}

export interface OldProjects {
  projects: OldProject[]
}

export interface PostDate {
  year: string
  month: string
  day: string
}

export interface PostMeta {
  date: string
  image?: string
}

export interface PostNote {
  id: string
  title: string
}

export interface Post {
  id: string
  meta: PostMeta
  title: string
  content: string
  date: PostDate
  slug: string
  tags: string[]
  publishedAt: string
  note?: PostNote
}

export interface Posts {
  posts: Post[]
}

export type PostPreview = Omit<Post, 'content'>

export interface PostsWithoutContent {
  posts: PostPreview[]
}
