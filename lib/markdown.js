import MarkdownIt from 'markdown-it'
import grayMatter from 'gray-matter'
import hljs from 'highlight.js'

// TODO: extend markdown-it to be HackMD compatible
const md = MarkdownIt('default', {
  linkify: true,
  typographer: true,
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return ''
  }
})

md.use(require('markdown-it-abbr'))
md.use(require('markdown-it-deflist'))
md.use(require('markdown-it-mark'))
md.use(require('markdown-it-ins'))
md.use(require('markdown-it-sub'))
md.use(require('markdown-it-sup'))

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
