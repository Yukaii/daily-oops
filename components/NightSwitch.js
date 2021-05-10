import useDarkMode from 'use-dark-mode';
import { SunIcon, MoonIcon } from '@primer/octicons-react'

export default function NightSwitch () {
  const darkMode = useDarkMode()

  return <button className='night-switch-button btn position-fixed top-2 right-4 px-2' type='button' onClick={darkMode.toggle}>
    { darkMode.value ? <MoonIcon /> : <SunIcon /> }
    <style scoped jsx>{`
      @media (max-width: 510px) {
        .night-switch-button {
          display: none; 
        }
      }
    `}</style>
  </button>
}
