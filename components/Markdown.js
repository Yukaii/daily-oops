import { render } from 'lib/markdown'
import useCopySnippet from 'lib/hooks/useCopySnippet'

const Markdown = ({ content, className, ...props }) => {
  useCopySnippet()

  return <main id='main' property='schema:mainEntity'>
    <article 
      itemScope
      itemProp='post'
      typeof='schema:Article schema:BlogPosting'
      property='schema:articleBody'
      className={`markdown-body ${className}`} 
      dangerouslySetInnerHTML={{ __html: render(content) }} {...props} 
    />    
  </main>
}

export default Markdown
