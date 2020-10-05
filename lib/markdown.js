import MarkdownIt from 'markdown-it'
import grayMatter from 'gray-matter'

// TODO: extend markdown-it to be HackMD compatible
const md = MarkdownIt()

export function parseMeta (src) {
  const {
    content,
    data
  } = grayMatter(src)

  return {
    data,
    content
  }
}

export function render (src) {
  return md.render(src)
}
