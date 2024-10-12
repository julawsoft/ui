import { useEffect, useState } from 'react'

export function CurrentDateTime() {
  const [dateTime, setDateTime] = useState('')

  useEffect(
    () =>
      setDateTime(
        new Date().toLocaleString('pt-br', {
          weekday: 'long',
          year: 'numeric',
          day: '2-digit',
          month: 'long',
        }),
      ),
    [],
  )

  return <>{dateTime}</>
}
