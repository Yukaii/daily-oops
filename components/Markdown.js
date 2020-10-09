import { render } from 'lib/markdown'

const Markdown = ({ content, className, ...props }) => <div className={`markdown-body ${className}`}dangerouslySetInnerHTML={{ __html: render(content) }} {...props} />
export default Markdown
