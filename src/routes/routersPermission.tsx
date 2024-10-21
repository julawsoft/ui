import { ReactNode } from 'react'
import { ROUTES_PATH } from './routePaths'
import Home from '../pages/Home'
import About from '../pages/About'
import Settings from '../pages/Settings'
import Restricted from '../pages/Restricted'
import NotFound from '../pages/NotFound'
import CreateDocument from '../pages/CreateDocument'


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
  { 
    path: ROUTES_PATH.About, 
    element: <About />, 
    roles: [
        'Admin',
        'Editor',
        'Viewer',
    ],
  },
  { 
    path: ROUTES_PATH.Restricted, 
    element: <Restricted />, 
    roles: [
        'Admin',
        'Editor',
        'Viewer',
    ],
  },
  { 
    path: ROUTES_PATH.Settings, 
    element: <Settings />, 
    roles: [
        'Admin',
        'Editor',
        'Viewer',
    ],
  },
  { 
    path: ROUTES_PATH.CreateDocument, 
    element: <CreateDocument />, 
    roles: [],
  },
  { 
    path: ROUTES_PATH.NOTFOUND, 
    element: <NotFound />, 
    roles: [],
  },
]
