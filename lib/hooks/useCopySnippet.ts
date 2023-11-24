import copy from 'copy-to-clipboard'
import { useEffect } from 'react'

// TODO: TS support
const isCopyButton = (button: any) =>
  button &&
  button.classList.contains('copy-snippet-button') &&
  !button.classList.contains('copied')

// TODO: TS support
const isButtonChildren = (elem: any) => {
  const button = elem.closest('.copy-snippet-button')

  return button && button.contains(elem) && button
}

export const useCopySnippet = () => {
  useEffect(() => {
    const onClick = function (e: Event) {
      let copyButton: any
      if (isCopyButton(e.target)) {
        copyButton = e.target
      } else {
        if (!(copyButton = isButtonChildren(e.target))) {
          return
        }
      }

      const pre = copyButton.closest('pre')

      copyButton.classList.add('copied')

      const code = [...pre.querySelectorAll('.hljs-line')]
        .map((l) => l.textContent)
        .join('\n')
      copy(code)

      window.setTimeout(() => {
        copyButton.classList.remove('copied')
      }, 700)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])
}

export default useCopySnippet
