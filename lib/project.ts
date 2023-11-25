import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

import { PROJECTS_MARKDOWN_URL } from './constants'

export function loadProjects() {
  return YAML.parse(
    fs.readFileSync(path.join(process.cwd(), './data/projects.yml'), 'utf-8')
  )
}

function parseGitHubFileLink(url: string) {
  const regex =
    /https:\/\/github.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)\/blob\/(?<branch>[^/]+)\/(?<path>.+)/

  const match = url.match(regex)

  if (!match) {
    throw new Error(`Invalid GitHub file link: ${url}`)
  }

  const { owner, repo, branch, path } = match.groups!

  return { owner, repo, branch, path }
}

function decodeBase64(str: string) {
  return Buffer.from(str, 'base64').toString('utf8')
}

export async function loadProjectMarkdown() {
  if (!PROJECTS_MARKDOWN_URL) {
    return ''
  }

  // https://github.com/Yukaii/Yukaii/blob/master/README.md
  const { owner, repo, branch, path } = parseGitHubFileLink(
    PROJECTS_MARKDOWN_URL
  )

  // https://api.github.com/repos/OWNER/REPO/contents/PATH?ref=BRANCH
  const data = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
    {
      headers: {
        Content: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  ).then((res) => res.json())

  const content = decodeBase64(data.content)

  // now extract content between two <!-- PROJECTS -->
  const regex = /<!-- PROJECTS -->(?<content>.+)<!-- PROJECTS -->/s
  const match = content.match(regex)

  if (!match) {
    throw new Error(`Invalid GitHub file content: ${content}`)
  }

  return match.groups!.content.trim()
}
