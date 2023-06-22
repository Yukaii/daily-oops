import useCopySnippet from 'lib/hooks/useCopySnippet'
import { render } from 'lib/markdown'

const Markdown = ({ content, className, ...props }) => {
  useCopySnippet()

  return (
    <main id="main" property="schema:mainEntity" className="h-entry">
      <article
        itemScope
        itemProp="post"
        typeof="schema:Article schema:BlogPosting"
        property="schema:articleBody"
        className={`markdown-body e-content ${className}`}
        dangerouslySetInnerHTML={{ __html: render(content) }}
        {...props}
      />
    </main>
  )
}

export default Markdown
