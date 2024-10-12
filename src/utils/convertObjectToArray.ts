export function convertObjectToArray(object: any) {
  try {
    if (object === undefined) return []
    return typeof object === 'object' ? [...object] : []
  } catch (e) {
    return []
  }
}
