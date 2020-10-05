import { getAllPostsWithSlug, getPostData } from '../../../../../lib/post'

export default function Post({ content }) {
  return <div className='markdown-body container'>
    { content }
  </div>
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { content } = await getPostData(params)

  return {
    props: {
      content
    }
  }
}

export async function getStaticPaths() {
  const paths = await getAllPostsWithSlug()

  return {
    paths,
    fallback: false
  }
}

