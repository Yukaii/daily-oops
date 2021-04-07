import { useEffect } from 'react'
import useDarkMode from 'use-dark-mode'

export const usePrimerDarkMode = () => {
  const darkMode = useDarkMode()

  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute('data-color-mode', darkMode.value ? 'dark' : 'light')
  }, [darkMode])
}
