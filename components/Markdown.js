import { render } from 'lib/markdown'
import useCopySnippet from 'lib/hooks/useCopySnippet'

const Markdown = ({ content, className, ...props }) => {
  useCopySnippet()

  return <main>
    <article 
      temscope 
      itemtype="https://schema.org/BlogPosting"
      className={`markdown-body ${className}`} 
      dangerouslySetInnerHTML={{ __html: render(content) }} {...props} 
    />    
  </main>
}

export default Markdown
