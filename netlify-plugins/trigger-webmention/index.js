import fs from 'fs'
import https from 'https'
import path from 'path'

export const onBuild = function ({ utils, netlifyConfig }) {
  const postsDir = path.join(process.cwd(), '.next/cache/posts')
  const postFiles = fs.readdirSync(postsDir)

  utils.status.show({
    title: 'Triggering webmention',
    summary: 'Triggering webmention',
  })

  let latestPost = null

  // Go through each post and find the latest one
  for (const file of postFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(postsDir, file), 'utf8'))

    if (
      !latestPost ||
      new Date(data.publishedAt) > new Date(latestPost.publishedAt)
    ) {
      latestPost = data
    }
  }

  netlifyConfig.latestPost = latestPost
}

export const onEnd = async function ({ utils, netlifyConfig }) {
  const latestPost = netlifyConfig.latestPost

  // If there is no latest post, return early
  if (!latestPost) {
    utils.status.show({
      title: 'Triggering webmention',
      summary: 'No latest post found',
    })

    return
  }

  // Create the post URL
  const url = `https://${process.env.DOMAIN}/blog/${latestPost.date.year}/${latestPost.date.month}/${latestPost.date.day}/${latestPost.slug}`
  console.log(`Triggering webmention for ${url}`)

  // Test if the URL is accessible
  try {
    await new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          if (res.statusCode === 200) {
            console.log('URL is accessible')
            resolve()
          } else {
            console.error('URL is not accessible')
            reject(new Error(`Status Code: ${res.statusCode}`))
          }
        })
        .on('error', reject)
    })
  } catch (error) {
    console.error(error)
    utils.build.failPlugin(
      'Failed to trigger webmention, URL is not accessible'
    )
    return
  }

  utils.status.show({
    title: 'Triggering webmention',
    summary: `Triggering webmention for ${url}`,
  })

  // Now, let's send the webmention
  const postData = JSON.stringify({
    token: process.env.TELEGRAPH_API_KEY,
    source: url,
    target_domain: 'https://fed.brid.gy/',
  })

  const options = {
    hostname: 'telegraph.p3k.io',
    port: 443,
    path: '/webmention',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = ''

      res.on('data', (d) => {
        responseData += d
      })

      res.on('end', () => {
        utils.status.show({
          title: 'Triggered webmention',
          summary: `Triggered webmention for ${url}`,
        })
        console.log(responseData)
        resolve(responseData)
      })

      res.on('error', (err) => {
        reject(err)
      })
    })

    req.on('error', (error) => {
      console.error(error)
      utils.build.failPlugin('Failed to trigger webmention')
      reject(error)
    })

    req.write(postData)
    req.end()
  })
}
