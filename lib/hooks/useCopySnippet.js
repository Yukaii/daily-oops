import { useEffect } from 'react'
import copy from 'copy-to-clipboard'

const isCopyButton = (button) =>
  button &&
  button.classList.contains('copy-snippet-button') &&
  !button.classList.contains('copied')

const isButtonChildren = (elem) => {
  const button = elem.closest('.copy-snippet-button')

  return button && button.contains(elem) && button
}

export const useCopySnippet = () => {
  useEffect(() => {
    const onClick = function (e) {
      let copyButton
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
