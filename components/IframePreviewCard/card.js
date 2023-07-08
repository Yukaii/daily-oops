import { GrabberIcon, XCircleFillIcon } from '@primer/octicons-react'
import React from 'react'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'

import useDraggableResizable from '../../lib/hooks/useDraggableResizable'

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

export const IframePreviewCard = ({
  url,
  onIframeError,
  onClose,
  onMoveOrResize,
  defaultCoordinates,
}) => {
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

  const {
    dragProps,
    dragContainerRef,
    dragElementRef,
    transformProps,
    horizontalResizeElementRef,
    verticalResizeElementRef,
    getOnResizeElementMouseDown,
    isResizing,
  } = useDraggableResizable({
    defaultWidth: defaultCoordinates.width,
    defaultHeight: defaultCoordinates.height,
    defaultX: defaultCoordinates.x,
    defaultY: defaultCoordinates.y,
  })

  onMoveOrResize(transformProps)

  // force render a new iframe component when url changes
  const iframeComponent = React.useMemo(() => {
    return (
      <>
        <iframe src={url} ref={iframeRef} onLoad={onLoad} />
        <style jsx>{`
          iframe {
            width: 100%;
            height: 100%;
            border: none;
            background-color: var(--color-bg-default);
          }
        `}</style>
      </>
    )
  }, [onLoad, url])

  return (
    <Portal>
      <div
        className="iframe-preview-card color-bg-default rounded-3 border color-shadow-small overflow-hidden"
        ref={dragContainerRef}
        style={{
          top: transformProps.y,
          left: transformProps.x,
          width: transformProps.width,
          height: transformProps.height,
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

        {/* show resizing overlay */}
        {isResizing && (
          <div
            className="position-absolute"
            style={{
              height: 'calc(100% - 38px)',
              width: 'calc(100% - 4px)',
              bottom: 2,
              right: 2,
            }}
          />
        )}

        {/* resize handles */}
        <div
          className="resize-handle resize-handle--right"
          onMouseDown={getOnResizeElementMouseDown('horizontal')}
          ref={horizontalResizeElementRef}
        />
        <div
          className="resize-handle resize-handle--bottom"
          onMouseDown={getOnResizeElementMouseDown('vertical')}
          ref={verticalResizeElementRef}
        />
      </div>

      <style jsx scoped>{`
        .iframe-preview-card {
          position: fixed;
          z-index: 999;

          padding-right: 2px;
          padding-bottom: 2px;
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

        .iframe-preview-card .resize-handle {
          position: absolute;
          width: 2px;
          cursor: col-resize;
        }

        .iframe-preview-card .resize-handle:hover {
          background-color: var(--color-accent-emphasis);
        }

        .iframe-preview-card .resize-handle--right {
          top: 0;
          right: 0;
          height: 100%;
        }

        .iframe-preview-card .resize-handle--bottom {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;

          cursor: row-resize;
        }
      `}</style>
    </Portal>
  )
}

export default IframePreviewCard
