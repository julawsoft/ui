export const getFirstAndLastName = (name: string) => {
  if (name.trim().length === 0) return 'Não definido'

  const names = name.trim().split(' ')

  if (names.length === 1) return name

  return ' ' + names[0] + ' ' + names[names.length - 1]
}
