import { ReactNode } from 'react'
import useGetUserPermissions from './useGetUserPermissions'

interface IPermissionGate {
  children: ReactNode
  roles: string[]
}

function PermissionGate({ children, roles }: IPermissionGate) {
  const userPermissions = useGetUserPermissions()

  const permissionGate = () => {
    if (roles.some((role) => userPermissions.roles.includes(role))) {
      return children
    }
    return null
  }
  return <>{permissionGate()}</>
}

export default PermissionGate
