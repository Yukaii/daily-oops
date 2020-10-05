export const getAllPostsWithSlug = async () => {
  // const data = await fetch(`https://hackmd.io/api/@${process.env.HACKMD_PROFILE}/overview`).then(r => r.json())


  // TODO: Fetch each post content and generate slug by its permalink or meta or title (fallback)

  return [{
    params: {
      year: '2019',
      month: '03',
      day: '02',
      slug: 'chrome-netlog-and-netlog-viewer-hidden-header-credentials'
    }
  }]
}

export const getPostData = async (params) => {
  console.log(`params = ${JSON.stringify(params)}`)

  return {
    content: 'Hello World from markdown file'
  }
}
