import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@primer/octicons-react'

export default function NightSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      className="night-switch-button btn position-fixed top-2 right-2 px-2"
      type="button"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
