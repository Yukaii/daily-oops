import { debounce } from 'lodash'
import { useEffect, useRef, useState } from 'react'

const READ_STATUS_KEY = 'read-status'

const useLocalStorage = (key, initialValue) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setLocalStorageValue = useRef(
    debounce((value) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(error)
      }
    }, 300)
  )

  useEffect(() => {
    setLocalStorageValue.current(storedValue)
    setIsLoaded(true)
  }, [storedValue, setLocalStorageValue])

  return [storedValue, setStoredValue, isLoaded]
}

export const useReadStatus = (slug) => {
  const [readStatuses, setReadStatuses, isLoaded] = useLocalStorage(
    READ_STATUS_KEY,
    {}
  )
  const readStatus = readStatuses[slug] || false

  const setReadStatus = (value) => {
    setReadStatuses({
      ...readStatuses,
      [slug]: value,
    })
  }

  return [readStatus, setReadStatus, isLoaded]
}

export default useReadStatus
