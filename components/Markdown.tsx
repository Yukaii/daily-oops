import useCopySnippet from '@/lib/hooks/useCopySnippet'
import { render } from '@/lib/markdown'

type MarkdownProps = {
  content: string
  className: string
}

const Markdown = ({ content, className, ...props }: MarkdownProps) => {
  useCopySnippet()

  return (
    <main id="main" property="schema:mainEntity" className="e-content ">
      <article
        itemScope
        itemProp="post"
        typeof="schema:Article schema:BlogPosting"
        property="schema:articleBody"
        className={`markdown-body ${className}`}
        dangerouslySetInnerHTML={{ __html: render(content) }}
        {...props}
      />

      {/* workaround for webmention to bridgy */}
      <a href="https://fed.brid.gy/" style={{ display: 'none' }}>
        https://fed.brid.gy/
      </a>
    </main>
  )
}

export default Markdown
