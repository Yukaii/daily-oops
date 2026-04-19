export const OPEN_SHORTCUTS_HELP_EVENT = 'site-shortcuts:open-help'
export const OPEN_SITE_SEARCH_EVENT = 'site-search:open'

export function openShortcutsHelp() {
  document.dispatchEvent(new CustomEvent(OPEN_SHORTCUTS_HELP_EVENT))
}

export function openSiteSearch() {
  document.dispatchEvent(new CustomEvent(OPEN_SITE_SEARCH_EVENT))
}
