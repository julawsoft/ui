import {
  House,
  User,
  Plus,
  Minus,
  Question,
  UsersFour,
  Buildings,
  UsersThree,
} from 'phosphor-react'
import { ROUTES } from '../../routes/constants'

export const SidebarData = [
  { title: 'Home', path: ROUTES.Home, icon: <House size={26} /> },
  {
    title: 'Teu Perfil',
    path: ROUTES.Profile,
    icon: <User size={26} />,
  },
  {
    title: 'Tua equipa',
    path: ROUTES.Equipa,
    icon: <User size={26} />,
  },
  {
    title: 'Pessoas',
    path: ROUTES.Pessoas,
    icon: <User size={26} />,
  },
  {
    title: 'RH',
    path: ROUTES.HomeRH,
    icon: <User size={26} />,
  },
  {
    title: 'Pessoas',
    path: '',
    icon: <UsersFour size={26} />,
    iconClosed: <Plus />,
    iconOpened: <Minus />,
    subNav: [
      { title: 'Item 1', path: ROUTES.Home, icon: <House size={26} /> },
      { title: 'Item 2', path: ROUTES.Home, icon: <House size={26} /> },
    ],
  },
  {
    title: 'Empresa',
    path: ROUTES.Empresa,
    icon: <Buildings size={26} />,
    iconClosed: <Plus />,
    iconOpened: <Minus />,
    subNav: [
      { title: 'Item 1', path: ROUTES.Home, icon: <House size={26} /> },
      { title: 'Item 2', path: ROUTES.Home, icon: <House size={26} /> },
    ],
  },
  {
    title: 'Equipa',
    path: ROUTES.Equipa,
    icon: <UsersThree size={26} />,
    iconClosed: <Plus />,
    iconOpened: <Minus />,
    subNav: [
      { title: 'Item 1', path: ROUTES.Home, icon: <House size={26} /> },
      { title: 'Item 2', path: ROUTES.Home, icon: <House size={26} /> },
    ],
  },
  {
    title: 'Ajuda',
    path: ROUTES.Ajuda,
    icon: <Question size={26} />,
  },
]
