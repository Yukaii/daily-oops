import { GrabberIcon, XCircleFillIcon } from '@primer/octicons-react'
import React from 'react'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'

import useResizableAndDraggable from '../../lib/hooks/useResizableAndDraggable'

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

export const IframePreviewCard = ({ url, onIframeError, onClose }) => {
  /** @type {React.RefObject<HTMLIFrameElement>} */
  const iframeRef = React.useRef(null)
  const [title, setTitle] = React.useState('Loading...')

  const onLoad = useCallback(() => {
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
  }, [onIframeError])

  const { dragProps, dragContainerRef, dragElementRef, transformProps } =
    useResizableAndDraggable()

  // force render a new iframe component when url changes
  const iframeComponent = React.useMemo(() => {
    return (
      <>
        <iframe
          src={'http://localhost:3000/blog'}
          // src={url}
          ref={iframeRef}
          onLoad={onLoad}
        />
        <style jsx>{`
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        `}</style>
      </>
    )
  }, [onLoad])

  return (
    <Portal>
      <div
        className="iframe-preview-card color-bg-default rounded-3 border color-shadow-small overflow-hidden"
        ref={dragContainerRef}
        style={{
          top: transformProps.y,
          left: transformProps.x,
        }}
      >
        {/* iframe modal navbar */}
        <div className="d-flex flex-justify-between color-bg-default border-bottom">
          <div className="p-2 d-flex">
            <span className="grabber" {...dragProps} ref={dragElementRef}>
              <GrabberIcon />
            </span>
            {title}
          </div>

          <div className="p-2">
            <span className="close color-fg-subtle" onClick={onClose}>
              <XCircleFillIcon />
            </span>
          </div>
        </div>

        {/* iframe */}
        {iframeComponent}
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

        .iframe-preview-card .grabber {
          cursor: grab;
        }

        .iframe-preview-card .close {
          cursor: pointer;
        }

        .iframe-preview-card .close:hover {
          color: var(--color-fg-muted);
        }
      `}</style>
    </Portal>
  )
}

export default IframePreviewCard
