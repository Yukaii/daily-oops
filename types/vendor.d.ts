declare module 'highlight.js/lib/core' {
  const hljs: any
  export default hljs
}

declare module 'highlight.js/lib/languages/*' {
  const language: any
  export default language
}

declare module 'markdown-it' {
  const MarkdownIt: any
  export default MarkdownIt
}

declare module 'markdown-it-*' {
  const plugin: any
  export = plugin
}

declare module 'markdown-it/lib/common/utils' {
  export function isSpace(code: number): boolean
}

declare module 'shorthash' {
  const shorthash: {
    unique(input: string): string
  }

  export = shorthash
}
