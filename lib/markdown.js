import MarkdownIt from 'markdown-it'
import grayMatter from 'gray-matter'
import hljs from 'highlight.js'

const wrapHljsLines = (html, code, lang) => {
  // TODO: start line number
  // TODO: hl_lines

  const codes = html.trim().split('\n').map((line, index) => {
    const lineNumber = index + 1
    const wrappedLine = `<td class="hljs-line" id="LC${lineNumber}">${line}</td>`
    return `<tr class="hljs-line"><td class="hljs-line-number" data-line-number=${lineNumber}></td>${wrappedLine}</tr>`
  }).join('')

  return `<table class="fence-wrapper"><tbody>${codes}</tbody></table>`
}

// TODO: extend markdown-it to be HackMD compatible
const md = MarkdownIt('default', {
  linkify: true,
  typographer: true,
  html: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlightedCode = hljs.highlight(lang, code).value
        // TODO: extra matcher to function
        if (lang.match(/\w+\=/)) {
          return wrapHljsLines(highlightedCode, code, lang)
        } else {
          // TODO: for testing
          return wrapHljsLines(highlightedCode, code, lang)
        }
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
