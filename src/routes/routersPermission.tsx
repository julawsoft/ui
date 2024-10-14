import { ReactNode } from 'react'
import { ROUTES_PATH } from './routePaths'
import Home from '../pages/Home'


interface IRoute {
  path: string
  element: ReactNode
  roles?: string[]
  subRoute?: ReactNode
}

export const routesPermissions: IRoute[] = [
  { 
    path: ROUTES_PATH.Home, 
    element: <Home />, 
    roles: [
        'Admin',
        'Editor',
        'Viewer',
    ],
  },
]
