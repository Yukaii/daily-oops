'use client'

import React, { useEffect, useRef, useState } from 'react'

import useStateRef from '@/lib/hooks/useStateRef'
import useViewport from '@/lib/hooks/useViewport'

import IframePreviewCard from './card'

function isExternalLink(url: string) {
  // compare with current location
  try {
    const urlObj = new URL(url)

    return urlObj.origin !== window.location.origin
  } catch (e) {
    return false
  }
}

const LOCAL_STORAGE_KEY = 'iframe-preview-card-size'

function saveSize(size: { x: number; y: number }) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(size))
}

function safeJSONParse(str: string) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

function loadSize() {
  const defaultCoordinates = { width: 400, height: 300, x: 0, y: 0 }

  const size = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (size) {
    return safeJSONParse(size) || defaultCoordinates
  }

  return defaultCoordinates
}

const useHoldingShiftKey = () => {
  const [, setIsHoldingShift, isHoldingShiftRef] = useStateRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsHoldingShift(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsHoldingShift(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [setIsHoldingShift])

  return isHoldingShiftRef
}

// Test if the url is valid and can be iframe embedded
async function headRequest(url: string) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      mode: 'no-cors',
    })

    return res.ok
  } catch (e) {
    console.error(e)
    return false
  }
}

// href might be a relative url or a full url
function parseHref(href: string) {
  try {
    const url = new URL(href, window.location.origin)
    return url.href
  } catch (e) {
    return href
  }
}

// Note: This is a provider for the IframePreviewCard component
// It should register the clicking event of any external link
// and bring up the IframePreviewCard component
export const IframePreviewCardProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const { width } = useViewport()
  const [, setPreviewCardEnabled, previewCardEnabledRef] = useStateRef(
    width > 768,
  )

  const isHoldingShiftRef = useHoldingShiftKey()

  useEffect(() => {
    setPreviewCardEnabled(width > 768)
  }, [setPreviewCardEnabled, width])

  const handleOpenPreview = async (target: HTMLAnchorElement) => {
    const url = parseHref(target.href)

    const openUrl = () => {
      const openTarget = target.getAttribute('target')
      if (openTarget) {
        window.open(target.href, openTarget)
      } else {
        window.location.href = target.href
      }
    }

    if (
      process.env.NODE_ENV === 'production' &&
      url &&
      !(await headRequest(url))
    ) {
      openUrl()
      return
    }

    if (process.env.NODE_ENV === 'production') {
      if (
        !isHoldingShiftRef.current ||
        !previewCardEnabledRef.current ||
        isExternalLink(url)
      ) {
        openUrl()
        return
      }
    }

    if (url) {
      setPreviewUrl(target.href)
      setShowPreview(true)
    }
  }

  const handlePreview = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    ) {
      return
    }

    const target = event.target

    if (!(target instanceof HTMLElement)) {
      return
    }

    const anchor = target.closest('a')

    if (
      !(anchor instanceof HTMLAnchorElement) ||
      !anchor.href ||
      !containerRef.current?.contains(anchor)
    ) {
      return
    }

    event.preventDefault()
    void handleOpenPreview(anchor)
  }

  return (
    <>
      <div ref={containerRef} onClickCapture={handlePreview}>
        {children}
      </div>
      {showPreview && (
        <IframePreviewCard
          url={previewUrl}
          onClose={() => setShowPreview(false)}
          onMoveOrResize={(size) => saveSize(size)}
          defaultCoordinates={loadSize()}
        />
      )}
    </>
  )
}

export default IframePreviewCardProvider
