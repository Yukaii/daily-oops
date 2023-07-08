import useStateRef from 'lib/hooks/useStateRef'
import React, { useEffect, useRef, useState } from 'react'

export const useDraggable = () => {
  const [isDragging, setIsDragging, isDraggingRef] = useStateRef(false)

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const dragContainerRef = React.useRef(null)
  const dragElementRef = React.useRef(null)

  const clickOffsetRef = useRef({ x: 0, y: 0 })

  const onDragElementMouseDown = React.useCallback((e) => {
    // calculate the relative offset from dragElemnt to mouse position
    const { clientX, clientY } = e
    const { top, left } = dragElementRef.current?.getBoundingClientRect()

    clickOffsetRef.current = {
      x: clientX - left,
      y: clientY - top,
    }

    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onMouseMove = React.useCallback(
    (e) => {
      if (!isDraggingRef.current) {
        return
      }

      const { clientX, clientY } = e

      setPosition({
        x: clientX - clickOffsetRef.current.x,
        y: clientY - clickOffsetRef.current.y,
      })
    },
    [isDraggingRef]
  )

  const stopDragging = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  const onMouseDown = React.useCallback((e) => {
    if (
      dragContainerRef.current &&
      dragContainerRef.current.contains(e.target)
    ) {
      return
    }

    stopDragging()
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopDragging)
    document.addEventListener('mouseleave', stopDragging)
    document.addEventListener('mousedown', onMouseDown)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', stopDragging)
      document.removeEventListener('mouseleave', stopDragging)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [onMouseDown, onMouseMove, stopDragging])

  const transformProps = {
    x: position.x,
    y: position.y,
  }

  return {
    dragContainerRef,
    dragElementRef,
    dragProps: {
      onMouseDown: onDragElementMouseDown,
    },
    isDragging,
    transformProps,
  }
}

export default useDraggable
