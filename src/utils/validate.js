export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

// judge svg icon is external or not
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}