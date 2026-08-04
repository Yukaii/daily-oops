import type { PropsWithChildren } from 'react'
import { ViewTransition } from 'react'

const transitionClasses = {
  'post-forward': 'post-forward',
  'post-back': 'post-back',
  default: 'none',
}

export default function PageViewTransition({ children }: PropsWithChildren) {
  return (
    <ViewTransition
      default="none"
      enter={transitionClasses}
      exit={transitionClasses}
    >
      {children}
    </ViewTransition>
  )
}
