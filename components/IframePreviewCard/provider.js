import useStateRef from 'lib/hooks/useStateRef'
import useViewport from 'lib/hooks/useViewport'
import React, { useEffect, useMemo, useState } from 'react'

import IframePreviewCard from './card'

// Note: This is a provider for the IframePreviewCard component
// It should register the clicking event of any external link
// and bring up the IframePreviewCard component
export const IframePreviewCardProvider = ({ children }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  const { width } = useViewport()
  const [, setPreviewCardEnabled, previewCardEnabledRef] = useStateRef(
    width > 768
  )

  useMemo(() => {
    setPreviewCardEnabled(width > 768)
  }, [setPreviewCardEnabled, width])

  useEffect(() => {
    const handlePreview = (e) => {
      if (!previewCardEnabledRef.current) {
        return
      }

      const { target } = e
      if (target.tagName === 'A' && target.href) {
        e.preventDefault()
        setPreviewUrl(target.href)
        setShowPreview(true)
      }
    }

    document.addEventListener('click', handlePreview)
    return () => document.removeEventListener('click', handlePreview)
  }, [])

  return (
    <>
      {children}
      {showPreview && (
        <IframePreviewCard
          url={previewUrl}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}

export default IframePreviewCardProvider
