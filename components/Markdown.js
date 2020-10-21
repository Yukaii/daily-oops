import { render } from 'lib/markdown'
import useCopySnippet from 'lib/hooks/useCopySnippet'

const Markdown = ({ content, className, ...props }) => {
  useCopySnippet()

  return <div className={`markdown-body ${className}`} dangerouslySetInnerHTML={{ __html: render(content) }} {...props} />
}

export default Markdown
