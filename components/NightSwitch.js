import useDarkMode from 'use-dark-mode';
import { SunIcon, MoonIcon } from '@primer/octicons-react'

export default function NightSwitch () {
  const darkMode = useDarkMode()

  return <button className='night-switch-button btn position-absolute top-4 right-4 px-2' type='button' onClick={darkMode.toggle}>
    { darkMode.value ? <MoonIcon /> : <SunIcon /> }
  </button>
}
