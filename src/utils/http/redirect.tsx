import { toast } from "react-toastify"

export const redirect = (url: string, sms: string, navigate: any, data: any) => {
    toast.success(sms)
    setTimeout(() => {
      navigate(`${url}`, {
        state: { ...data },
      })
    }, 1000)
  }

  /*
  const redirect = (url: string, sms: string) => {
    toast.success(sms)
    setTimeout(() => {
      navigate(`${url}/${token}`, {
        state: { ...data },
      })
    }, 1000)
  }

  */