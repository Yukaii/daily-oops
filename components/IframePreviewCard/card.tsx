import { GrabberIcon, XCircleFillIcon } from '@primer/octicons-react'
import cx from 'classnames'
import React from 'react'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'

import { useDraggableResizable } from '../../lib/hooks/useDraggableResizable'

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

const Portal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, findOrCreatePortalContainer())
}

type IframePreviewCardProps = {
  url: string
  onIframeError?: Function
  onClose: () => void
  onMoveOrResize: (size: { x: number; y: number }) => void
  defaultCoordinates: {
    width: number
    height: number
    x: number
    y: number
  }
}

export const IframePreviewCard = ({
  url,
  onIframeError,
  onClose,
  onMoveOrResize,
  defaultCoordinates,
}: IframePreviewCardProps) => {
  /** @type {React.RefObject<HTMLIFrameElement>} */
  const iframeRef = React.useRef(null) as any // TODO: TS support
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
    resizableRef: dragContainerRef,
    draggableRef: dragElementRef,
    onDragElementMouseDown,
    position,
    size,
    horizontalResizeElementRef,
    verticalResizeElementRef,
    bothResizeElementRef,
    resizeDirection,
    getOnResizeElementMouseDown,
    isResizing,
  } = useDraggableResizable({
    defaultSize: {
      width: defaultCoordinates.width,
      height: defaultCoordinates.height,
    },
    defaultPosition: {
      x: defaultCoordinates.x,
      y: defaultCoordinates.y,
    },
    minimalSize: {
      width: 200,
      height: 200,
    },
  })

  onMoveOrResize({
    ...position,
    ...size,
  })

  // force render a new iframe component when url changes
  const iframeComponent = React.useMemo(() => {
    return (
      <>
        <iframe src={url} ref={iframeRef} onLoad={onLoad} />
        <style jsx>{`
          iframe {
            width: 100%;
            height: calc(100% - 38px);
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
          top: position.y,
          left: position.x,
          width: size.width,
          height: size.height,
        }}
      >
        {/* iframe modal navbar */}
        <div
          className="d-flex flex-justify-between color-bg-default border-bottom"
          style={{ height: 38 }}
        >
          <div className="p-2 d-flex Truncate">
            <span
              className="grabber"
              ref={dragElementRef}
              onMouseDown={onDragElementMouseDown}
            >
              <GrabberIcon />
            </span>
            <span className="Truncate-text">{title}</span>
          </div>

          <div className="p-2">
            <span className="close" onClick={onClose} title="Close">
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
          className="resize-handle resize-handle--bottom-right"
          onMouseDown={getOnResizeElementMouseDown('both')}
          ref={bothResizeElementRef}
        />

        <div
          className={cx('resize-handle resize-handle--right', {
            'is-resizing':
              isResizing && ['both', 'horizontal'].includes(resizeDirection!),
          })}
          onMouseDown={getOnResizeElementMouseDown('horizontal')}
          ref={horizontalResizeElementRef}
        />
        <div
          className={cx('resize-handle resize-handle--bottom', {
            'is-resizing':
              isResizing && ['both', 'vertical'].includes(resizeDirection!),
          })}
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
          color: var(--color-fg-subtle);
        }

        .iframe-preview-card .close:hover {
          color: var(--color-fg-muted);
        }

        .iframe-preview-card .resize-handle {
          position: absolute;
          width: 2px;
          cursor: col-resize;
        }

        .iframe-preview-card .resize-handle:hover,
        .iframe-preview-card .resize-handle.is-resizing {
          background-color: var(--color-accent-emphasis);
          transition: background-color 0.2s ease-in-out;
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

        .iframe-preview-card .resize-handle--bottom-right {
          bottom: 0px;
          right: 0px;
          width: 5px;
          height: 5px;
          cursor: nwse-resize;
          z-index: 1;
        }

        .iframe-preview-card .resize-handle--bottom-right:hover {
          background-color: transparent;
        }

        .iframe-preview-card
          .resize-handle--bottom-right:hover
          ~ .resize-handle--bottom,
        .iframe-preview-card
          .resize-handle--bottom-right:hover
          ~ .resize-handle--right {
          background-color: var(--color-accent-emphasis);
        }
      `}</style>
    </Portal>
  )
}

export default IframePreviewCard
