import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

const portalContainerClassName = 'scroll-progress-portal'

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

export const ScrollProgress = () => {
  const [progress, setProgress] = React.useState(0)

  const onScroll = React.useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const newProgress = (scrollTop / (scrollHeight - clientHeight)) * 100
    setProgress(newProgress)
  }, [setProgress])

  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return (
    <Portal>
      <div className="scroll-progress-container">
        <div
          className="scroll-progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <style jsx scoped>{`
        .scroll-progress-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 999999;
          background-color: var(--color-bg-subtle);
        }

        .scroll-progress {
          height: 100%;
          background-color: var(--color-accent-emphasis);
        }
      `}</style>
    </Portal>
  )
}

export default ScrollProgress
