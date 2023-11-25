import { useEffect, useState } from 'react'
// get the viewport width and height
export const useViewport = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleWindowResize)

    handleWindowResize()

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return { width, height }
}

export default useViewport
