export enum FileExtension {
  PDF = 'pdf',
  DOCX = 'docx',
  PNG = 'png',
  JPEG = 'jpg',
}
export function isValidString(value: string | undefined | null) {
  return value !== undefined && value !== null && value.trim() !== ''
}
export function isValidDate(date) {
  // Check if the date is valid using Moment.js
  return date instanceof Date && !isNaN(date.getTime())
}

export function isValidWebsite(value: string | undefined | null) {
  return true
}
