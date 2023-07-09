import useStateRef from 'lib/hooks/useStateRef'
import React, { useCallback, useRef, useState } from 'react'

export const useDraggable = ({ defaultX = 0, defaultY = 0 } = {}) => {
  const [isDragging, setIsDragging, isDraggingRef] = useStateRef(false)
  const [position, setPosition] = useState({ x: defaultX, y: defaultY })
  const dragElementRef = React.useRef(null)
  const clickOffsetRef = useRef({ x: 0, y: 0 })

  const onDragElementMouseDown = React.useCallback(
    (e) => {
      const { clientX, clientY } = e
      const { top, left } = dragElementRef.current?.getBoundingClientRect()

      clickOffsetRef.current = {
        x: clientX - left,
        y: clientY - top,
      }

      e.preventDefault()
      setIsDragging(true)
    },
    [setIsDragging]
  )

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
    [isDraggingRef, setPosition]
  )

  const stopDragging = React.useCallback(() => {
    setIsDragging(false)
  }, [setIsDragging])

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopDragging)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', stopDragging)
    }
  }, [onMouseMove, stopDragging])

  return {
    dragElementRef,
    isDragging,
    position,
    onDragElementMouseDown,
    stopDragging,
  }
}

export const useResizable = ({
  defaultWidth = 300,
  defaultHeight = 400,
  minimalWidth = 100,
  minimalHeight = 100,
} = {}) => {
  const [isResizing, setIsResizing, isResizingRef] = useStateRef(false)
  const [resizeDirection, setResizeDirection, resizeDirectionRef] =
    useStateRef(null)
  const [size, setSize] = useStateRef({
    width: defaultWidth,
    height: defaultHeight,
  })

  const dragContainerRef = React.useRef(null)
  const horizontalResizeElementRef = useRef(null)
  const verticalResizeElementRef = useRef(null)
  const bothResizeElementRef = useRef(null)

  const getOnResizeElementMouseDown = React.useCallback(
    (dir) => (e) => {
      e.preventDefault()
      setIsResizing(true)
      setResizeDirection(dir)
    },
    [setIsResizing, setResizeDirection]
  )

  const onMouseMove = React.useCallback(
    (e) => {
      if (!isResizingRef.current) {
        return
      }

      const { clientX, clientY } = e
      const { top, left, height, width } =
        dragContainerRef.current?.getBoundingClientRect()

      let targetSize = { width, height }

      if (resizeDirectionRef.current === 'horizontal') {
        targetSize = { width: clientX - left, height }
      } else if (resizeDirectionRef.current === 'vertical') {
        targetSize = { width, height: clientY - top }
      } else if (resizeDirectionRef.current === 'both') {
        targetSize = { width: clientX - left, height: clientY - top }
      }

      if (targetSize.width < minimalWidth) {
        targetSize.width = minimalWidth
      }

      if (targetSize.height < minimalHeight) {
        targetSize.height = minimalHeight
      }

      setSize(targetSize)
    },
    [isResizingRef, minimalHeight, minimalWidth, resizeDirectionRef, setSize]
  )

  const stopResizing = React.useCallback(() => {
    setIsResizing(false)
  }, [setIsResizing])

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopResizing)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', stopResizing)
    }
  }, [onMouseMove, stopResizing])

  return {
    dragContainerRef,
    horizontalResizeElementRef,
    verticalResizeElementRef,
    bothResizeElementRef,
    isResizing,
    size,
    resizeDirection,
    getOnResizeElementMouseDown,
    stopResizing,
  }
}

export const useDraggableResizable = ({
  defaultPosition = { x: 0, y: 0 },
  defaultSize = { width: 300, height: 400 },
  minimalSize = { width: 100, height: 100 },
} = {}) => {
  const {
    dragElementRef: draggableRef,
    isDragging,
    position,
    onDragElementMouseDown,
    stopDragging,
  } = useDraggable({ defaultX: defaultPosition.x, defaultY: defaultPosition.y })

  const {
    dragContainerRef: resizableRef,
    horizontalResizeElementRef,
    verticalResizeElementRef,
    bothResizeElementRef,
    isResizing,
    size,
    resizeDirection,
    getOnResizeElementMouseDown,
    stopResizing,
  } = useResizable({
    defaultWidth: defaultSize.width,
    defaultHeight: defaultSize.height,
    minimalWidth: minimalSize.width,
    minimalHeight: minimalSize.height,
  })

  const isDraggingOrResizing = isDragging || isResizing

  const stopDraggingOrResizing = useCallback(() => {
    stopDragging()
    stopResizing()
  }, [stopDragging, stopResizing])

  return {
    draggableRef,
    resizableRef,
    horizontalResizeElementRef,
    verticalResizeElementRef,
    bothResizeElementRef,
    isDraggingOrResizing,
    isDragging,
    isResizing,
    position,
    size,
    resizeDirection,
    onDragElementMouseDown,
    getOnResizeElementMouseDown,
    stopDraggingOrResizing,
  }
}
