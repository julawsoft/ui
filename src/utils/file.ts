export function formatFileSize(bytes): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'

  const i = parseInt(
    String(Number(Math.floor(Math.log(bytes) / Math.log(1024)))),
    10,
  )
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}
