import { useState } from 'react'
import { toast } from 'react-toastify'

function useAsyncStatePages<T>() {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)

  return {
    data,
    loading,
    setData,
    setLoading,
    toastMessage: toast,
  }
}

export default useAsyncStatePages
