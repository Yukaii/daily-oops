import { getAllPostsWithSlug, formatPostsAsParams, getPostData } from '../../../../../lib/post'
import { render } from '../../../../../lib/markdown'

export default function Post({ content, title }) {
  // !FIXME: don't render title twice

  return <div className='container'>
    <h1>{title}</h1>
    <div className='markdown-body' dangerouslySetInnerHTML={{ __html: render(content) }} />
  </div>
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const { content, title } = await getPostData(params)

  return {
    props: {
      content,
      title
    }
  }
}

export async function getStaticPaths() {
  const paths = formatPostsAsParams(await getAllPostsWithSlug())

  return {
    paths,
    fallback: false
  }
}

