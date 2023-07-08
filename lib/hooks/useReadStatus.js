// A react hooks that use localstorage to store the read status of a post
import { useEffect, useState } from 'react'

const READ_STATUS_KEY = 'read-status'

export const useReadStatus = (slug) => {
  const [readStatus, setReadStatus] = useState(false)

  useEffect(() => {
    const readStatuses = JSON.parse(localStorage.getItem(READ_STATUS_KEY)) || {}
    setReadStatus(readStatuses[slug] || false)
  }, [slug])

  useEffect(() => {
    const readStatuses = JSON.parse(localStorage.getItem(READ_STATUS_KEY)) || {}
    readStatuses[slug] = readStatus
    localStorage.setItem(READ_STATUS_KEY, JSON.stringify(readStatuses))
  }, [readStatus, slug])

  return [readStatus, setReadStatus]
}

export default useReadStatus
