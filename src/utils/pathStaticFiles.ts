export default function pathStaticFiles(path: string) {

  if (path && path.includes('informative_notes')) {
    const pathStaticFiles =
      import.meta.env.VITE_URL_STATIC_FILES + ''
    return pathStaticFiles + '/' + path
  } else {
    const pathStaticFiles =
      import.meta.env.VITE_URL_STATIC_FILES + '/informative_notes'
    return pathStaticFiles + '/' + path
  }

}

export function pathStaticFilesUserProfile(image: string) {
  const pathStaticFiles = import.meta.env.VITE_URL_STATIC_FILES + ''
  return pathStaticFiles + '/' + image
}
