import React from 'react'
import ReactDOM from 'react-dom'

const portalContainerClassName = 'iframe-preview-card-portal'

const findOrCreatePortalContainer = () => {
  let portalContainer = document.querySelector(`.${portalContainerClassName}`)
  if (!portalContainer) {
    portalContainer = document.createElement('div')
    portalContainer.className = portalContainerClassName
    document.body.appendChild(portalContainer)
  }
  return portalContainer
}

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, findOrCreatePortalContainer())
}

export const IframePreviewCard = ({ url, onIframeError }) => {
  /** @type {React.RefObject<HTMLIFrameElement>} */
  const iframeRef = React.useRef(null)
  const [title, setTitle] = React.useState('Loading...')

  const onLoad = () => {
    try {
      if (!iframeRef.current) {
        return
      }
      const iframe = iframeRef.current
      const doc = iframe.contentDocument || iframe.contentWindow.document
      setTitle(doc.title)
    } catch (e) {
      console.error('IframePreviewCard error')
      console.error(e)
      if (typeof onIframeError === 'function') {
        onIframeError(e)
      }
    }
  }

  return (
    <Portal>
      <div className="iframe-preview-card">
        {/* iframe modal navbar */}
        <div className="d-flex justify-content-between">
          <div className="p-2">{title}</div>
        </div>

        <iframe src={url} ref={iframeRef} onLoad={onLoad} />
      </div>

      <style jsx scoped>{`
        .iframe-preview-card {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 400px;
          z-index: 999;
        }
        .iframe-preview-card iframe {
          width: 100%;
          height: 100%;
          border: none;
          resize: both;
        }
      `}</style>
    </Portal>
  )
}

export default IframePreviewCard
