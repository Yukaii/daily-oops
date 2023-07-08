import React, { useEffect, useState } from 'react'

import IframePreviewCard from './card'

// Note: This is a provider for the IframePreviewCard component
// It should register the clicking event of any external link
// and bring up the IframePreviewCard component
export const IframePreviewCardProvider = ({ children }) => {
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    const handlePreview = (e) => {
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
      {showPreview && <IframePreviewCard url={previewUrl} />}
    </>
  )
}

export default IframePreviewCardProvider
