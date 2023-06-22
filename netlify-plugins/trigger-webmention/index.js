import fs from 'fs'
import https from 'https'
import path from 'path'

export const onEnd = async function () {
  const postsDir = path.join(process.cwd(), '.next/cache/posts')
  const postFiles = fs.readdirSync(postsDir)

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

  // If there is no latest post, return early
  if (!latestPost) {
    return
  }

  // Create the post URL
  const url = `https://${process.env.DOMAIN}/blog/${latestPost.date.year}/${latestPost.date.month}/${latestPost.date.day}/${latestPost.slug}`

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
        resolve(responseData)
      })

      res.on('error', (err) => {
        reject(err)
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(postData)
    req.end()
  })
}
