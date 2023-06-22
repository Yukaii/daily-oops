import fs from 'fs'
import https from 'https'
import path from 'path'

function toBase64(input) {
  return Buffer.from(input, 'utf8').toString('base64')
}

function fromBase64(input) {
  return Buffer.from(input, 'base64').toString('utf8')
}

const sendWebmention = (url) => {
  const data = `source=${encodeURIComponent(url)}&target=${encodeURIComponent(
    'https://fed.brid.gy/'
  )}`
  const options = {
    hostname: 'fed.brid.gy',
    port: 443,
    path: '/webmention',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = ''

      res.on('data', (chunk) => {
        responseData += chunk
      })

      res.on('end', () => {
        resolve(responseData)
      })

      res.on('error', (error) => {
        reject(error)
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(data)
    req.end()
  })
}

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

  if (!latestPost) {
    utils.build.failPlugin('Failed to find latest post')
    return
  }

  netlifyConfig.build.environment.LATEST_POST_DATA = toBase64(
    JSON.stringify(latestPost)
  )
}

export const onEnd = async function ({ utils, netlifyConfig }) {
  const base64LatestPostData = netlifyConfig.build.environment.LATEST_POST_DATA

  if (!base64LatestPostData) {
    console.error('Failed to find latest post data from env')
    utils.build.failPlugin('Failed to find latest post data from env')
    return
  }

  const latestPost = JSON.parse(fromBase64(base64LatestPostData))

  if (!latestPost) {
    console.error('Failed to find latest post')
    utils.build.failPlugin('Failed to find latest post')
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

  try {
    await sendWebmention(url)

    utils.status.show({
      title: 'Triggered webmention',
      summary: `Triggered webmention for ${url}`,
    })
  } catch (error) {
    console.error(error)
    utils.build.failPlugin('Failed to trigger webmention')
  }
}
