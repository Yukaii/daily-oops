import useStateRef from 'lib/hooks/useStateRef'
import React, { useEffect, useRef, useState } from 'react'

export const useDraggableResizable = ({ defaultWidth, defaultHeight } = {}) => {
  const [isDragging, setIsDragging, isDraggingRef] = useStateRef(false)
  const [isResizing, setIsResizing, isResizingRef] = useStateRef(false)

  // one of vertical, horizontal
  const [resizeDirection, setResizeDirection, resizeDirectionRef] =
    useStateRef(null)

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  })

  const dragContainerRef = React.useRef(null)
  const dragElementRef = React.useRef(null)

  const horizontalResizeElementRef = useRef(null)
  const verticalResizeElementRef = useRef(null)

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

  const getOnResizeElementMouseDown = React.useCallback(
    (dir) => (e) => {
      e.preventDefault()
      setIsResizing(true)
      setResizeDirection(dir)
    },
    []
  )

  const onMouseMove = React.useCallback(
    (e) => {
      if (!isDraggingRef.current && !isResizingRef.current) {
        return
      }

      const { clientX, clientY } = e

      if (isDraggingRef.current) {
        setPosition({
          x: clientX - clickOffsetRef.current.x,
          y: clientY - clickOffsetRef.current.y,
        })
      }

      if (isResizingRef.current) {
        const { top, left, height, width } =
          dragContainerRef.current?.getBoundingClientRect()
        if (resizeDirectionRef.current === 'horizontal') {
          setSize({
            width: clientX - left,
            height,
          })
        } else if (resizeDirectionRef.current === 'vertical') {
          setSize({
            width,
            height: clientY - top,
          })
        }
      }
    },
    [isDraggingRef, isResizingRef, resizeDirectionRef, setSize]
  )

  const stopDragging = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  const stopResizing = React.useCallback(() => {
    setIsResizing(false)
  }, [])

  const stopDraggingAndResizing = React.useCallback(() => {
    stopDragging()
    stopResizing()
  }, [stopDragging, stopResizing])

  const onMouseDown = React.useCallback((e) => {
    if (
      dragContainerRef.current &&
      dragContainerRef.current.contains(e.target)
    ) {
      return
    }

    if (
      (horizontalResizeElementRef.current &&
        horizontalResizeElementRef.current.contains(e.target)) ||
      (verticalResizeElementRef.current &&
        verticalResizeElementRef.current.contains(e.target))
    ) {
      return
    }

    stopDragging()
    stopResizing()
  }, [])

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopDraggingAndResizing)
    document.addEventListener('mouseleave', stopDraggingAndResizing)
    document.addEventListener('mousedown', onMouseDown)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', stopDraggingAndResizing)
      document.removeEventListener('mouseleave', stopDraggingAndResizing)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [onMouseDown, onMouseMove, stopDraggingAndResizing])

  const transformProps = {
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
  }

  return {
    dragContainerRef,
    dragElementRef,
    dragProps: {
      onMouseDown: onDragElementMouseDown,
    },
    horizontalResizeElementRef,
    verticalResizeElementRef,
    getOnResizeElementMouseDown,
    isDragging,
    isResizing,
    transformProps,
  }
}

export default useDraggableResizable
