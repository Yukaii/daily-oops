import type { ComponentPropsWithoutRef } from 'react'

import { render } from '@/lib/markdown'

import CopySnippetBinder from './CopySnippetBinder'

type MarkdownProps = Omit<
  ComponentPropsWithoutRef<'article'>,
  'children' | 'dangerouslySetInnerHTML'
> & {
  content: string
  className?: string
}

const Markdown = ({
  content,
  className = '',
  ...articleProps
}: MarkdownProps) => {
  const rdfaProps = {
    typeof: 'schema:Article schema:BlogPosting',
  }

  return (
    <main id="main" property="schema:mainEntity" className="e-content ">
      <CopySnippetBinder />
      <article
        itemScope
        itemProp="post"
        property="schema:articleBody"
        className={`markdown-body ${className}`}
        dangerouslySetInnerHTML={{ __html: render(content) }}
        {...rdfaProps}
        {...articleProps}
      />

      {/* workaround for webmention to bridgy */}
      <a href="https://fed.brid.gy/" style={{ display: 'none' }}>
        https://fed.brid.gy/
      </a>
    </main>
  )
}

export default Markdown
