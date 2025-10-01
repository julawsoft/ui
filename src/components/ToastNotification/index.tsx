import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ToastNotification() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      closeOnClick
      pauseOnFocusLoss={false}
      pauseOnHover={true}
      draggable={false}
      limit={3}
      toastStyle={{ zIndex: 9999 }}
      theme="colored"
    />
  )
}
