import { MoonIcon, SunIcon } from '@primer/octicons-react'
import { useTheme } from 'next-themes'

export default function NightSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      className="night-switch-button btn position-fixed top-2 right-2 px-2"
      type="button"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
      aria-label="Toggle Night Mode"
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
