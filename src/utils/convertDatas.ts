import Conveter from 'timestamp-conv'

export function transmDataSplit(param: string) {
  if (param.includes('@')) {
    const [start, end] = param.split('@')
    return `${organizedData(start)} - ${organizedData(end)}`
  } else {
    return param
  }
}

export function organizedData(param: string | any) {
  if (param === undefined || param === null) return param

  function transformOne(param: string) {
    const f = param.split('-')
    if (f[0].length === 4) return `${f[2].substring(0, 2)}-${f[1]}-${f[0]}`
    return `${f[0].substring(0, 2)}-${f[1]}-${f[1]}`
  }

  function transformTwo(param: string) {
    const f = param.split('/')
    if (f[0].length === 4) return `${f[2].substring(0, 2)}/${f[1]}/${f[0]}`
    return `${f[0].substring(0, 2)}/${f[1]}/${f[1]}`
  }
  return param.includes('-') ? transformOne(param) : transformTwo(param)
}

export function convertDataHours(
  data: string = new Date().toLocaleDateString(),
) {
  return new Conveter.timestamp(data).formatSeconds
}

export function organizeRangeDate(first: string, second: string) {
  return `${organizedData(first)} |  ${organizedData(second)}`
}


export function DisplayDateString(date: string) {
  return String(
    new Date(date).toLocaleString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )
}

export function DisplayDateAndHourtString(date: string) {
  return String(
    new Date(date).toLocaleString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
  )
}