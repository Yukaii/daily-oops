// Takem from https://hoangtrinhj.com/using-google-analytics-with-next-js

import { NEXT_PUBLIC_GA_TRACKING_ID } from '@/lib/constants'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  window.gtag('config', NEXT_PUBLIC_GA_TRACKING_ID!, {
    page_path: url,
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: number
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
