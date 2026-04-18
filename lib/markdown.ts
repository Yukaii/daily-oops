import grayMatter from 'gray-matter'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import go from 'highlight.js/lib/languages/go'
import http from 'highlight.js/lib/languages/http'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import powershell from 'highlight.js/lib/languages/powershell'
import python from 'highlight.js/lib/languages/python'
import ruby from 'highlight.js/lib/languages/ruby'
import scss from 'highlight.js/lib/languages/scss'
import shell from 'highlight.js/lib/languages/shell'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItContainer from 'markdown-it-container'
import markdownItToc from 'markdown-it-toc-done-right'

import markdownItCallout from './markdown-it-plugins/callout'

type HighlightRange = number | [number, number]
type MarkdownToken = {
  attrJoin: (name: string, value: string) => void
  info: string
  nesting: number
}
type MarkdownRenderer = {
  renderToken: (
    tokens: MarkdownToken[],
    idx: number,
    options: unknown,
    env: unknown,
    self: MarkdownRenderer,
  ) => string
}

const highlightLanguages = [
  ['javascript', javascript],
  ['js', javascript],
  ['typescript', typescript],
  ['ts', typescript],
  ['json', json],
  ['java', java],
  ['markdown', markdown],
  ['md', markdown],
  ['shell', shell],
  ['powershell', powershell],
  ['css', css],
  ['scss', scss],
  ['yaml', yaml],
  ['python', python],
  ['http', http],
  ['go', go],
  ['ruby', ruby],
  ['bash', bash],
  ['xml', xml],
] as const

highlightLanguages.forEach(([name, language]) => {
  hljs.registerLanguage(name, language)
})

const isHighlighted = (
  lineNumber: number,
  lines: HighlightRange[],
): boolean => {
  return lines.some((line) => {
    if (Array.isArray(line)) {
      return line[0] <= lineNumber && lineNumber <= line[1]
    }

    return lineNumber === line
  })
}

const processLang = (lang = ''): string => {
  const matchNumber = lang.match(/(.+)=/)
  return matchNumber?.[1] ?? lang
}

const parseHighlightedRanges = (langAttrs = ''): HighlightRange[] => {
  const match = langAttrs.match(/\[([\d-,\s]+)\]/)

  if (!match) {
    return []
  }

  return match[1]
    .split(',')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map<HighlightRange>((segment) => {
      if (!segment.includes('-')) {
        return Number.parseInt(segment, 10)
      }

      const [start, end] = segment
        .split('-')
        .map((value) => Number.parseInt(value.trim(), 10))

      return [start, end]
    })
}

const wrapCodeLines = (html: string, lang = '', langAttrs = ''): string => {
  const showLineNumber = /\w+=/.test(lang)
  const lineOffsetMatch = lang.match(/\w+=(\d+)/)
  const lineOffset = lineOffsetMatch
    ? Math.abs(Number.parseInt(lineOffsetMatch[1], 10)) - 1
    : 0
  const highlightedLines = parseHighlightedRanges(langAttrs)

  // Use slice(0, -1) to fix the trailing line break added by markdown-it.
  const codeRows = html
    .slice(0, -1)
    .split('\n')
    .map((line, index) => {
      const lineNumber = index + 1 + lineOffset
      const highlighted = isHighlighted(lineNumber, highlightedLines)
        ? ' highlighted'
        : ''
      const wrappedLine = `<td class="hljs-line${highlighted}" id="LC${lineNumber}">${line}</td>`

      return `<tr><td class="hljs-line-number" data-line-number=${lineNumber}></td>${wrappedLine}</tr>`
    })
    .join('')

  const lineNumberClass = showLineNumber ? ' has-line-number' : ''
  const clipboardButton =
    '<button class="top-1 right-1 btn copy-snippet-button position-absolute"><i class="fas fa-clipboard"></i><i class="fas fa-check"></i></button>'

  return `${clipboardButton}<table class="fence-wrapper${lineNumberClass}"><tbody>${codeRows}</tbody></table>`
}

const containerClassNamesMap = {
  info: 'flash',
  success: 'flash flash-success',
  warning: 'flash flash-warn',
  danger: 'flash flash-error',
} as const

function containerRenderer(
  tokens: MarkdownToken[],
  idx: number,
  options: unknown,
  env: unknown,
  self: MarkdownRenderer,
): string {
  const token = tokens[idx]
  const type = token.info.trim() as keyof typeof containerClassNamesMap
  const className = containerClassNamesMap[type] ?? containerClassNamesMap.info

  token.attrJoin('class', `container-block rounded-2 p-3 ${className}`)

  return self.renderToken(tokens, idx, options, env, self)
}

const md = MarkdownIt('default', {
  linkify: true,
  typographer: true,
  html: true,
  highlight(code: string, lang = '', langAttrs = ''): string {
    const highlightedLang = processLang(lang)

    if (lang && hljs.getLanguage(highlightedLang)) {
      try {
        const highlightedCode = hljs.highlight(code, {
          language: highlightedLang,
        }).value

        return wrapCodeLines(highlightedCode, lang, langAttrs)
      } catch {
        return wrapCodeLines(code, lang, langAttrs)
      }
    }

    return wrapCodeLines(code, lang, langAttrs)
  },
})

md.use(require('markdown-it-abbr'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-imsize'))
  .use(require('markdown-it-image-figures'), {
    dataType: true,
    figcaption: true,
  })
  .use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'anchor',
    permalinkBefore: true,
    permalinkSymbol:
      '<svg class="octicon octicon-link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l-2.5 2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>',
  })
  .use(markdownItToc)
  .use(markdownItContainer, 'success', { render: containerRenderer })
  .use(markdownItContainer, 'info', { render: containerRenderer })
  .use(markdownItContainer, 'warning', { render: containerRenderer })
  .use(markdownItContainer, 'danger', { render: containerRenderer })
  .use(markdownItContainer, 'spoiler', {
    validate(params: string): RegExpMatchArray | null {
      return params.trim().match(/^spoiler(\s+.*)?$/)
    },
    render(tokens: MarkdownToken[], idx: number): string {
      const match = tokens[idx].info.trim().match(/^spoiler(\s+.*)?$/)

      if (tokens[idx].nesting === 1) {
        const summary = match?.[1]?.trim()

        if (summary) {
          return `<details><summary>${md.renderInline(summary)}</summary>\n`
        }

        return '<details>\n'
      }

      return '</details>\n'
    },
  })
  .use(require('markdown-it-ruby'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-task-lists'), {})
  .use(require('markdown-it-html5-embed'), {
    html5embed: {
      useImageSyntax: true,
    },
  })
  .use(markdownItCallout)

export function parseMeta<
  TFrontmatter extends Record<string, unknown> = Record<string, unknown>,
>(
  src = '',
): {
  data: TFrontmatter
  content: string
} {
  const { content, data } = grayMatter(src)

  return {
    data: data as TFrontmatter,
    content,
  }
}

export function render(src: string): string {
  return md.render(src)
}
