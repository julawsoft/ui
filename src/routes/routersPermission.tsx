import { ReactNode } from 'react'
import { Home } from '../pages/Home'
import { ROUTES } from './constants'
import { GroupsPermissions } from '../utils/groups'
import ProfileGeneral from '../pages/Profile'
import { DetailsNotes } from '../pages/Notes/pages/Details'
import { Equipa } from '../pages/Equipa'
import { Pessoas } from '../pages/Pessoas'
import { HomeRH } from '../pages/HomeRH'
import ImportCSV from '../pages/Pessoas/import'
import RequestDetails from '../pages/RequestDetails'
import { EquipaRH } from '../pages/EquipaRH'
import { Notes } from '../pages/Notes'
import { NewNotes } from '../pages/Notes/pages/New'
import { EditNote } from '../pages/Notes/pages/Edit'
import { ConfigNotes } from '../pages/Notes/pages/Config'
import YourRequests from '../pages/YourRequests'
import Company from '../pages/Company'

interface IRoute {
  path: string
  element: ReactNode
  roles?: string[]
  subRoute?: ReactNode
}

export const routesPermissions: IRoute[] = [
  { path: ROUTES.Home, element: <Home />, roles: [] },
  {
    path: ROUTES.Profile,
    element: <ProfileGeneral />,
    roles: [],
  },
  {
    path: ROUTES.Equipa,
    element: <Equipa />,
    roles: [
      GroupsPermissions.LIDER,
      GroupsPermissions.RH,
      GroupsPermissions.ADMIN,
      GroupsPermissions.RH_LEADER,
    ],
  },
  {
    path: ROUTES.HomeRH,
    element: <HomeRH />,
    roles: [],
  },
  {
    path: ROUTES.Pessoas,
    element: <Pessoas />,
    roles: [],
  },
  {
    path: ROUTES.ImportCSV,
    element: <ImportCSV />,
    roles: [
      GroupsPermissions.RH,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
      GroupsPermissions.RH_LEADER,
    ],
  },
  {
    path: ROUTES.Documents,
    element: <ProfileGeneral />,
    roles: [
      GroupsPermissions.RH,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    path: ROUTES.InformativeNotesPreview,
    element: <DetailsNotes />,
    roles: [],
  },
  {
    path: ROUTES.RequestDetails,
    element: <RequestDetails />,
    roles: [],
  },
  {
    path: ROUTES.EquipaRH,
    element: <EquipaRH />,
    roles: [
      GroupsPermissions.ADMIN,
      GroupsPermissions.COLAB,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH_LEADER,
    ],
  },
  {
    path: ROUTES.InformativeNotes,
    element: <Notes />,
    roles: [
      GroupsPermissions.ADMIN,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
    ],
  },
  {
    path: ROUTES.InformativeNoteCreate,
    element: <NewNotes />,
    roles: [
      GroupsPermissions.ADMIN,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
    ],
  },
  {
    path: ROUTES.InformativeNoteEdit,
    element: <EditNote />,
    roles: [
      GroupsPermissions.ADMIN,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
    ],
  },
  {
    path: ROUTES.InformativeNotesConfig,
    element: <ConfigNotes />,
    roles: [
      GroupsPermissions.ADMIN,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
    ],
  },
  {
    path: ROUTES.YourRequests,
    element: <YourRequests />,
    roles: [
      GroupsPermissions.ADMIN,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.COLAB,
    ],
  },
  {
    path: ROUTES.Company,
    element: <Company />,
    roles: [],
  },
]
