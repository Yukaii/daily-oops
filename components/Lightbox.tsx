'use client'

import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@primer/octicons-react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import styles from '@/components/Lightbox.module.scss'

type LightboxItem = {
  alt: string
  caption: string
  height?: number
  src: string
  width?: number
}

type GalleryState = {
  activeIndex: number
  items: LightboxItem[]
}

type ImageDescriptor = LightboxItem & {
  element: HTMLImageElement
}

type LightboxProps = {
  children: ReactNode
}

const IMAGE_SELECTOR = 'img[src]'
const IMAGE_FILE_PATTERN = /\.(avif|gif|jpe?g|png|svg|webp)(\?.*)?$/i

const getNumericAttribute = (
  image: HTMLImageElement,
  name: 'width' | 'height',
) => {
  const value = Number.parseInt(image.getAttribute(name) ?? '', 10)

  return Number.isFinite(value) && value > 0 ? value : undefined
}

const normalizeCaption = (value: string | null | undefined) => {
  const trimmedValue = value?.trim()

  if (!trimmedValue) {
    return ''
  }

  if (trimmedValue.toLowerCase() === 'image') {
    return ''
  }

  return trimmedValue
}

const getImageCaption = (image: HTMLImageElement) => {
  const figure = image.closest('figure[data-type="image"]')
  const figureCaption = normalizeCaption(
    figure?.querySelector('figcaption')?.textContent,
  )
  const altCaption = normalizeCaption(image.getAttribute('alt'))

  return figureCaption || altCaption
}

const getImageSource = (image: HTMLImageElement) =>
  image.currentSrc || image.getAttribute('src') || ''

const isPlainLeftClick = (event: ReactMouseEvent<HTMLElement>) =>
  event.button === 0 &&
  !event.defaultPrevented &&
  !event.metaKey &&
  !event.ctrlKey &&
  !event.shiftKey &&
  !event.altKey

const isLightboxAnchor = (
  anchor: HTMLAnchorElement | null,
  image: HTMLImageElement,
) => {
  if (!anchor) {
    return true
  }

  const href = anchor.getAttribute('href')?.trim()

  if (!href || href.startsWith('#')) {
    return true
  }

  const imageSource = getImageSource(image)

  if (href === imageSource) {
    return true
  }

  try {
    const url = new URL(href, window.location.href)

    return IMAGE_FILE_PATTERN.test(url.pathname)
  } catch {
    return false
  }
}

const collectImages = (root: HTMLElement): ImageDescriptor[] =>
  Array.from(root.querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR))
    .filter((image) => Boolean(getImageSource(image)))
    .map((image) => ({
      alt: image.getAttribute('alt')?.trim() ?? '',
      caption: getImageCaption(image),
      element: image,
      height: image.naturalHeight || getNumericAttribute(image, 'height'),
      src: getImageSource(image),
      width: image.naturalWidth || getNumericAttribute(image, 'width'),
    }))

export default function Lightbox({ children }: LightboxProps) {
  const dialogTitleId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [gallery, setGallery] = useState<GalleryState | null>(null)

  const closeLightbox = () => {
    setGallery(null)
  }

  const stepGallery = (direction: -1 | 1) => {
    setGallery((currentGallery) => {
      if (!currentGallery || currentGallery.items.length <= 1) {
        return currentGallery
      }

      const itemCount = currentGallery.items.length
      const nextIndex =
        (currentGallery.activeIndex + direction + itemCount) % itemCount

      return {
        ...currentGallery,
        activeIndex: nextIndex,
      }
    })
  }

  const handleContainerClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isPlainLeftClick(event)) {
      return
    }

    const image = (event.target as HTMLElement).closest('img')

    if (!(image instanceof HTMLImageElement)) {
      return
    }

    const anchor = image.closest('a')

    if (!isLightboxAnchor(anchor, image)) {
      return
    }

    const images = collectImages(containerRef.current)
    const activeIndex = images.findIndex(({ element }) => element === image)

    if (activeIndex < 0) {
      return
    }

    event.preventDefault()

    setGallery({
      activeIndex,
      items: images.map(({ element, ...item }) => item),
    })
  }

  useEffect(() => {
    if (!gallery) {
      return
    }

    const { body } = document
    const previousOverflow = body.style.overflow

    body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        stepGallery(-1)
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        stepGallery(1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [gallery])

  const activeItem = gallery?.items[gallery.activeIndex]
  const canNavigate = (gallery?.items.length ?? 0) > 1

  return (
    <>
      <div ref={containerRef} onClickCapture={handleContainerClick}>
        {children}
      </div>

      {gallery &&
        activeItem &&
        createPortal(
          <div
            className={styles.backdrop}
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeLightbox()
              }
            }}
          >
            <div
              aria-describedby={activeItem.caption ? dialogTitleId : undefined}
              aria-modal="true"
              className={styles.dialog}
              role="dialog"
            >
              <div className={styles.chrome}>
                <div className={styles.meta}>
                  <span className={styles.counter}>
                    {gallery.activeIndex + 1} / {gallery.items.length}
                  </span>
                </div>

                <button
                  aria-label="Close image preview"
                  className={`btn btn-sm ${styles.controlButton} ${styles.iconOnlyButton}`}
                  type="button"
                  onClick={closeLightbox}
                >
                  <XIcon size={20} />
                </button>
              </div>

              <div className={styles.stage}>
                {canNavigate && (
                  <button
                    aria-label="Previous image"
                    className={`btn btn-sm ${styles.controlButton} ${styles.navButton}`}
                    type="button"
                    onClick={() => stepGallery(-1)}
                  >
                    <ArrowLeftIcon size={20} />
                  </button>
                )}

                <div className={styles.imageFrame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={activeItem.alt}
                    className={styles.image}
                    height={activeItem.height}
                    src={activeItem.src}
                    width={activeItem.width}
                  />

                  {activeItem.caption && (
                    <p className={styles.caption} id={dialogTitleId}>
                      {activeItem.caption}
                    </p>
                  )}
                </div>

                {canNavigate && (
                  <button
                    aria-label="Next image"
                    className={`btn btn-sm ${styles.controlButton} ${styles.navButton}`}
                    type="button"
                    onClick={() => stepGallery(1)}
                  >
                    <ArrowRightIcon size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
