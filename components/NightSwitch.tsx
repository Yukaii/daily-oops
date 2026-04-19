'use client'

import { MoonIcon, SunIcon } from '@primer/octicons-react'
import cx from 'classnames'
import { useTheme } from 'next-themes'
import type { AriaRole, MouseEvent } from 'react'
import { useRef } from 'react'

type NightSwitchProps = {
  label: string
  className?: string
  role?: AriaRole
  showText?: boolean
  onPress?: () => void
  variant?: 'default' | 'menu'
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const getRevealRadius = (x: number, y: number) =>
  Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

const nextFrame = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })

const waitForThemeAttribute = async (theme: string) => {
  if (document.documentElement.getAttribute('data-color-mode') === theme) {
    return
  }

  await new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.getAttribute('data-color-mode') === theme) {
        observer.disconnect()
        resolve()
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-mode'],
    })
  })
}

const copyCssVariables = (
  source: CSSStyleDeclaration,
  target: CSSStyleDeclaration,
) => {
  for (const propertyName of source) {
    if (!propertyName.startsWith('--')) {
      continue
    }

    target.setProperty(propertyName, source.getPropertyValue(propertyName))
  }
}

const withTemporaryTheme = <T,>(theme: string, callback: () => T) => {
  const root = document.documentElement
  const previousTheme = root.getAttribute('data-color-mode')
  const previousColorScheme = root.style.colorScheme

  root.setAttribute('data-color-mode', theme)
  root.style.colorScheme = theme

  try {
    return callback()
  } finally {
    if (previousTheme) {
      root.setAttribute('data-color-mode', previousTheme)
    } else {
      root.removeAttribute('data-color-mode')
    }

    if (previousColorScheme) {
      root.style.colorScheme = previousColorScheme
    } else {
      root.style.removeProperty('color-scheme')
    }
  }
}

const createThemeSnapshot = (theme: string, zIndex = 999) => {
  const appRoot = document.getElementById('app-root')

  if (!appRoot) {
    return null
  }

  const root = document.documentElement
  const snapshot = document.createElement('div')
  const clone = withTemporaryTheme(
    theme,
    () => appRoot.cloneNode(true) as HTMLElement,
  )

  snapshot.className = 'theme-transition-snapshot'
  snapshot.setAttribute('aria-hidden', 'true')
  snapshot.setAttribute('data-theme-snapshot', '')
  snapshot.setAttribute('data-color-mode', theme)
  snapshot.setAttribute(
    'data-light-theme',
    root.getAttribute('data-light-theme') ?? 'light',
  )
  snapshot.setAttribute(
    'data-dark-theme',
    root.getAttribute('data-dark-theme') ?? 'dark',
  )
  snapshot.style.zIndex = `${zIndex}`
  clone.removeAttribute('id')

  withTemporaryTheme(theme, () => {
    const rootStyles = getComputedStyle(root)
    const bodyStyles = getComputedStyle(document.body)

    snapshot.style.colorScheme = theme
    snapshot.style.backgroundColor = bodyStyles.backgroundColor
    snapshot.style.color = bodyStyles.color
    copyCssVariables(rootStyles, snapshot.style)
  })

  snapshot.appendChild(clone)
  document.body.appendChild(snapshot)
  snapshot.scrollTop = window.scrollY

  return snapshot
}

export default function NightSwitch({
  label,
  className,
  role,
  showText = false,
  onPress,
  variant = 'default',
}: NightSwitchProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const isAnimatingRef = useRef(false)
  const icon = resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light'

    if (isAnimatingRef.current) {
      return
    }

    onPress?.()

    if (!resolvedTheme || prefersReducedMotion()) {
      setTheme(nextTheme)
      return
    }

    isAnimatingRef.current = true
    const currentTheme = resolvedTheme

    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const revealRadius = getRevealRadius(x, y)
    const reverseDirection = nextTheme === 'light'
    const snapshot = createThemeSnapshot(currentTheme, 999)

    if (!snapshot) {
      setTheme(nextTheme)
      isAnimatingRef.current = false
      return
    }

    let revealSnapshot: HTMLDivElement | null = null

    try {
      await nextFrame()

      if (reverseDirection) {
        revealSnapshot = createThemeSnapshot(nextTheme, 1000)

        if (!revealSnapshot) {
          setTheme(nextTheme)
          await waitForThemeAttribute(nextTheme)
          await nextFrame()
          return
        }

        revealSnapshot.style.clipPath = `circle(0px at ${x}px ${y}px)`

        setTheme(nextTheme)
        await waitForThemeAttribute(nextTheme)
        await nextFrame()

        const revealAnimation = revealSnapshot.animate(
          [
            {
              clipPath: `circle(0px at ${x}px ${y}px)`,
              opacity: 1,
            },
            {
              clipPath: `circle(${revealRadius}px at ${x}px ${y}px)`,
              opacity: 1,
            },
          ],
          {
            duration: 520,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards',
          },
        )

        await revealAnimation.finished
      } else {
        setTheme(nextTheme)
        await waitForThemeAttribute(nextTheme)
        await nextFrame()

        const revealAnimation = snapshot.animate(
          [
            {
              clipPath: `circle(${revealRadius}px at ${x}px ${y}px)`,
              opacity: 1,
            },
            {
              clipPath: `circle(0px at ${x}px ${y}px)`,
              opacity: 0.4,
            },
          ],
          {
            duration: 520,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards',
          },
        )

        await revealAnimation.finished
      }
    } finally {
      revealSnapshot?.remove()
      snapshot.remove()
      isAnimatingRef.current = false
    }
  }

  return (
    <button
      className={cx('night-switch-button btn', className, {
        'px-2': variant !== 'menu',
      })}
      type="button"
      onClick={handleClick}
      role={role}
      aria-label={label}
      title={label}
    >
      {variant === 'menu' ? (
        <span className="site-mobile-menu-item-label">
          {icon}
          <span>{label}</span>
        </span>
      ) : (
        icon
      )}
      {showText && variant !== 'menu' ? (
        <span className="night-switch-button-label">{label}</span>
      ) : null}
    </button>
  )
}
