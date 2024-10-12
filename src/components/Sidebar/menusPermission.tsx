import { ReactNode } from 'react'
import { ROUTES } from '../../routes/constants'
import { GroupsPermissions } from '../../utils/groups'
import { INDEX_MENUS, TITLE_MENUS } from './constantes'
import { ChatsTeardrop, House, Note, User, Users, UsersFour } from 'phosphor-react'
import { FaRegBuilding, FaRegCalendarCheck } from "react-icons/fa";

interface IMenus {
  title: string
  path: string
  icon: ReactNode
  index: number
  isSubMenu: boolean
  roles?: string[]
  subMenu?: IMenus[]
}

export const menusPermissions: IMenus[] = [
  {
    title: TITLE_MENUS.Home,
    path: ROUTES.Home,
    icon: <House size={24} />,
    index: INDEX_MENUS.Home,
    isSubMenu: false,
    roles: [
      GroupsPermissions.COLAB,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    title: TITLE_MENUS.YOU_PROFILE,
    path: ROUTES.Profile,
    icon: <User size={24} />,
    index: INDEX_MENUS.YOU_PROFILE,
    isSubMenu: false,
    roles: [
      GroupsPermissions.COLAB,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    title: TITLE_MENUS.YOU_REQUEST,
    path: ROUTES.YourRequests,
    icon: <FaRegCalendarCheck  size={24} />,
    index: INDEX_MENUS.YOU_REQUEST,
    isSubMenu: false,
    roles: [
      GroupsPermissions.COLAB,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    title: TITLE_MENUS.YOUR_TIME,
    path: ROUTES.Equipa,
    icon: <UsersFour size={24} />,
    index: INDEX_MENUS.YOUR_TIME,
    isSubMenu: false,
    roles: [
      GroupsPermissions.LIDER,
      GroupsPermissions.ADMIN,
      GroupsPermissions.RH_LEADER,
    ],
  },
  {
    title: TITLE_MENUS.PEOPLE,
    path: ROUTES.Pessoas,
    icon: <Users size={24} />,
    index: INDEX_MENUS.PEOPLE,
    isSubMenu: false,
    roles: [
      GroupsPermissions.COLAB,
      GroupsPermissions.LIDER,
      GroupsPermissions.RH,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    title: TITLE_MENUS.REQUEST,
    path: ROUTES.EquipaRH,
    icon: <ChatsTeardrop size={24} />,
    index: INDEX_MENUS.REQUEST,
    isSubMenu: false,
    roles: [
      GroupsPermissions.RH,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    title: TITLE_MENUS.NOTE,
    path: ROUTES.InformativeNotes,
    icon: <Note size={24} />,
    index: INDEX_MENUS.NOTES,
    isSubMenu: false,
    roles: [
      GroupsPermissions.RH,
      GroupsPermissions.RH_LEADER,
      GroupsPermissions.RH_AUX,
      GroupsPermissions.LIDER,
      GroupsPermissions.ADMIN,
    ],
  },
  {
    title: TITLE_MENUS.COMPANY,
    path: ROUTES.Company,
    icon: <FaRegBuilding size={24} />,
    index: INDEX_MENUS.COMPANY,
    isSubMenu: false,
    roles: [],
  },
]
