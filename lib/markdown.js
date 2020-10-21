import MarkdownIt from 'markdown-it'
import grayMatter from 'gray-matter'
import hljs from 'highlight.js'

const isHighlighted = (lineNumber, lines) => {
  return lines.some(l => {
    if (Array.isArray(l)) {
      return l[0] <= lineNumber && lineNumber <= l[1]
    } else {
      return lineNumber === l
    }
  })
}

const processLang = (lang) => {
  const matchNumber = lang.match(/(.+)\=/)
  if (matchNumber) {
    return matchNumber[1]
  }

  return lang
}

const wrapHljsLines = (html, lang, langAttrs = '') => {
  let showLineNumber = false
  if (lang.match(/\w+\=/)) {
    showLineNumber = true
  }


  const lineOffsetMatch = lang.match(/\w+\=(\d+)/)
  let lineOffset = 0
  if (lineOffsetMatch) {
    lineOffset = Math.abs(parseInt(lineOffsetMatch[1], 10)) - 1
  }

  let highlightedLines = []
  const highlightedRangesMatch = langAttrs.match(/\[([\d-,]+)\]/)
  if (highlightedRangesMatch) {
    highlightedRangesMatch[1].split(',').forEach(s => {
      if (s.includes('-')) {
        highlightedLines = [
          ...highlightedLines,
          s.split('-').map(n => parseInt(n, 10))
        ]
      } else {
        highlightedLines.push(parseInt(s, 10))
      }
    })
  }

  // Use slice(0, -1) to fix trailing line break
  const codes = html.slice(0, -1).split('\n').map((line, index) => {
    const lineNumber = index + 1 + lineOffset
    const highlighted = isHighlighted(lineNumber, highlightedLines) ? ' highlighted' : ''
    const wrappedLine = `<td class="hljs-line${highlighted}" id="LC${lineNumber}">${line}</td>`
    return `<tr><td class="hljs-line-number" data-line-number=${lineNumber}></td>${wrappedLine}</tr>`
  }).join('')

  const lineNumberClass = showLineNumber ? ' has-line-number' : ''
  const clipboardButton = `<button class="btn copy-snippet-button position-absolute top-1 right-1"><i class="far fa-clipboard"></i><i class="fas fa-check"></i></button>`

  return `${clipboardButton}<table class="fence-wrapper${lineNumberClass}"><tbody>${codes}</tbody></table>`
}

// TODO: extend markdown-it to be HackMD compatible
const md = MarkdownIt('default', {
  linkify: true,
  typographer: true,
  html: true,
  highlight: function (code, lang, langAttrs) {
    const highlightedLang = processLang(lang)
    if (lang && hljs.getLanguage(highlightedLang)) {
      try {
        const highlightedCode = hljs.highlight(highlightedLang, code).value
        return wrapHljsLines(highlightedCode, lang, langAttrs)
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
