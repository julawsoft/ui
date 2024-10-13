import { ReactNode } from 'react'
import { Home } from '../pages/Home'
import { ROUTES } from './constants'

interface IRoute {
  path: string
  element: ReactNode
  roles?: string[]
  subRoute?: ReactNode
}

export const routesPermissions: IRoute[] = [
  { path: ROUTES.Home, element: <Home />, roles: [] },
]
