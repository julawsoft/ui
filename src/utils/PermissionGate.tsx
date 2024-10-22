import { ReactNode } from 'react'
import useAuthStore from '../context/authStore'

interface IPermissionGate {
  children: ReactNode
  roles: string[]
}

function PermissionGate({ children, roles }: IPermissionGate) {
  const user = useAuthStore((state) => state.user)

  if(!user) return null   

  const permissionGate = () => {
    if (roles.some((role) => user?.roles.includes(role))) {
      return children
    }
    return null
  }
  return <>{permissionGate()}</>
}

export default PermissionGate
