import React, { useState } from 'react'

export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

export default useMounted
