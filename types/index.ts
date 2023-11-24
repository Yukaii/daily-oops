export interface OldProjects {
  projects: {
    title: string
    description: string
    link: string
    image: string
  }[]
}

export interface Post {
  id: string
  meta: {
    date: string
  }
  title: string
  content: string
  date: {
    year: string
    month: string
    day: string
  }
  slug: string
  tags: string[]
  publishedAt: string
}

export interface Posts {
  posts: Post[]
}

export interface PostsWithoutContent extends Omit<Posts, 'content'> {}
