import { MoonIcon, SunIcon } from '@primer/octicons-react'
import { useTheme } from 'next-themes'

type NightSwitchProps = {
  label: string
}

export default function NightSwitch({ label }: NightSwitchProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      className="night-switch-button btn px-2"
      type="button"
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
      aria-label={label}
      title={label}
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
