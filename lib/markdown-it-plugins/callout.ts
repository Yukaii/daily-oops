import { isSpace } from 'markdown-it/lib/common/utils'

type MarkdownToken = {
  info: string
  markup?: string
  map?: [number, number]
}

type BlockRuleState = {
  bMarks: number[]
  blkIndent: number
  bsCount: number[]
  eMarks: number[]
  line: number
  lineMax: number
  md: {
    block: {
      ruler: {
        getRules: (name: string) => BlockRule[]
      }
      tokenize: (
        state: BlockRuleState,
        startLine: number,
        endLine: number,
      ) => void
    }
    renderer: {
      rules: Record<string, RendererRule>
    }
  }
  parentType: string
  push: (type: string, tag: string, nesting: number) => MarkdownToken
  sCount: number[]
  src: string
  tShift: number[]
}

type BlockRule = (
  state: BlockRuleState,
  startLine: number,
  endLine: number,
  silent: boolean,
) => boolean

type RendererRule = (
  tokens: MarkdownToken[],
  idx: number,
  options: unknown,
  env: unknown,
  self: unknown,
) => string

type MarkdownInstance = {
  block: {
    ruler: {
      at: (name: string, rule: BlockRule) => void
    }
  }
  renderer: {
    rules: Record<string, RendererRule>
  }
}

const calloutToClassMap = {
  note: 'info',
  tip: 'success',
  warning: 'warning',
  danger: 'danger',
} as const

const calloutToIconMap = {
  note: 'info-circle',
  tip: 'fire',
  warning: 'exclamation-triangle',
  danger: 'exclamation-circle',
  todo: 'check-circle',
} as const

const renderCalloutOpen: RendererRule = (tokens, idx) => {
  const token = tokens[idx]
  const info = token.info.trim().toLowerCase()
  const className =
    calloutToClassMap[info as keyof typeof calloutToClassMap] ?? 'info'
  const icon =
    calloutToIconMap[info as keyof typeof calloutToIconMap] ?? 'info-circle'

  return (
    `<div class="callout callout-${className}" data-label="${info}">` +
    `<span class="callout-icon"><i class="fas fa-fw fa-${icon}"></i></span>`
  )
}

const renderCalloutClose: RendererRule = () => '</div>'

const calloutRule: BlockRule = (state, startLine, endLine, silent) => {
  let adjustTab = false
  let ch = 0
  let initial = 0
  let lastLineEmpty = false
  let nextLine = startLine
  let offset = 0
  let oldIndent = state.blkIndent
  let oldParentType = state.parentType
  let spaceAfterMarker = false
  let terminate = false
  let isOutdented = false
  const oldLineMax = state.lineMax
  const oldBMarks: number[] = []
  const oldBSCount: number[] = []
  const oldSCount: number[] = []
  const oldTShift: number[] = []
  const terminatorRules = state.md.block.ruler.getRules('blockquote')
  let hasCallout = false
  let calloutMarkerLength = 0

  let pos = state.bMarks[startLine] + state.tShift[startLine]
  let max = state.eMarks[startLine]

  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false
  }

  if (state.src.charCodeAt(pos) !== 0x3e) {
    return false
  }

  pos += 1

  if (
    state.src.charCodeAt(pos) === 0x20 &&
    state.src.charCodeAt(pos + 1) === 0x5b &&
    state.src.charCodeAt(pos + 2) === 0x21
  ) {
    const startPos = pos + 3
    pos = startPos

    while (pos < max && state.src.charCodeAt(pos) !== 0x5d) {
      pos += 1
    }

    if (state.src.charCodeAt(pos) === 0x5d) {
      hasCallout = true
      calloutMarkerLength = pos - startPos

      if (!silent) {
        const token = state.push('callout_open', 'callout', 1)
        token.markup = '> [!'
        token.info = state.src.slice(startPos, pos).trim().toLowerCase()
      }
    }
  }

  if (silent) {
    return true
  }

  state.parentType = 'blockquote'

  for (nextLine = startLine; nextLine < endLine; nextLine += 1) {
    isOutdented = state.sCount[nextLine] < state.blkIndent
    pos = state.bMarks[nextLine] + state.tShift[nextLine]
    max = state.eMarks[nextLine]

    if (pos >= max) {
      break
    }

    if (state.src.charCodeAt(pos) === 0x3e && !isOutdented) {
      pos += 1
      initial = state.sCount[nextLine] + 1

      if (state.src.charCodeAt(pos) === 0x20) {
        pos += 1
        initial += 1
        adjustTab = false
        spaceAfterMarker = true
      } else if (state.src.charCodeAt(pos) === 0x09) {
        spaceAfterMarker = true

        if ((state.bsCount[nextLine] + initial) % 4 === 3) {
          pos += 1
          initial += 1
          adjustTab = false
        } else {
          adjustTab = true
        }
      } else {
        spaceAfterMarker = false
      }

      offset = initial
      oldBMarks.push(state.bMarks[nextLine])
      state.bMarks[nextLine] = pos

      while (pos < max) {
        ch = state.src.charCodeAt(pos)

        if (!isSpace(ch)) {
          break
        }

        if (ch === 0x09) {
          offset +=
            4 - ((offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4)
        } else {
          offset += 1
        }

        pos += 1
      }

      lastLineEmpty = pos >= max

      oldBSCount.push(state.bsCount[nextLine])
      state.bsCount[nextLine] =
        state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0)

      oldSCount.push(state.sCount[nextLine])
      state.sCount[nextLine] = offset - initial

      oldTShift.push(state.tShift[nextLine])
      state.tShift[nextLine] = pos - state.bMarks[nextLine]
      continue
    }

    if (lastLineEmpty) {
      break
    }

    terminate = false

    for (const rule of terminatorRules) {
      if (rule(state, nextLine, endLine, true)) {
        terminate = true
        break
      }
    }

    if (terminate) {
      state.lineMax = nextLine

      if (state.blkIndent !== 0) {
        oldBMarks.push(state.bMarks[nextLine])
        oldBSCount.push(state.bsCount[nextLine])
        oldTShift.push(state.tShift[nextLine])
        oldSCount.push(state.sCount[nextLine])
        state.sCount[nextLine] -= state.blkIndent
      }

      break
    }

    oldBMarks.push(state.bMarks[nextLine])
    oldBSCount.push(state.bsCount[nextLine])
    oldTShift.push(state.tShift[nextLine])
    oldSCount.push(state.sCount[nextLine])
    state.sCount[nextLine] = -1
  }

  oldIndent = state.blkIndent
  state.blkIndent = 0

  const lines: [number, number] = [startLine, 0]
  let token = state.push('blockquote_open', 'blockquote', 1)
  token.markup = '>'
  token.map = lines

  if (hasCallout) {
    state.bMarks[startLine] += calloutMarkerLength + 3
  }

  state.md.block.tokenize(state, startLine, nextLine)

  token = state.push('blockquote_close', 'blockquote', -1)
  token.markup = '>'

  if (hasCallout) {
    token = state.push('callout_close', 'callout', -1)
    token.markup = ']'
  }

  state.lineMax = oldLineMax
  state.parentType = oldParentType
  lines[1] = state.line

  for (let index = 0; index < oldTShift.length; index += 1) {
    state.bMarks[index + startLine] = oldBMarks[index]
    state.tShift[index + startLine] = oldTShift[index]
    state.sCount[index + startLine] = oldSCount[index]
    state.bsCount[index + startLine] = oldBSCount[index]
  }

  state.blkIndent = oldIndent

  return true
}

export default function calloutPlugin(md: MarkdownInstance): void {
  md.block.ruler.at('blockquote', calloutRule)
  md.renderer.rules.callout_open = renderCalloutOpen
  md.renderer.rules.callout_close = renderCalloutClose
}
