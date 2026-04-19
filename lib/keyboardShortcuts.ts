export const OPEN_SHORTCUTS_HELP_EVENT = 'site-shortcuts:open-help'

export function openShortcutsHelp() {
  document.dispatchEvent(new CustomEvent(OPEN_SHORTCUTS_HELP_EVENT))
}
