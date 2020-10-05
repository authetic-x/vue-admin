import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin'

export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return title
}