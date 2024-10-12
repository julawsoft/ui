import { useState } from 'react'

interface IToastMessage {
  title: string
  message: string
  status: 'success' | 'error' | 'info' | 'warning' | 'loading'
}

function useAsyncState<T>() {
  const [data, setData] = useState<null | T>()
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<IToastMessage | null>(null)

  return {
    error,
    data,
    loading,
    success,
    setData,
    setError,
    setLoading,
    setSuccess,
    toastMessage,
    setToastMessage,
    message,
    setMessage,
  }
}

export default useAsyncState
