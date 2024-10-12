export function DisplayDate(date: string) {
  return String(
    new Date(date).toLocaleString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )
}
