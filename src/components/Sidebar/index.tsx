// src/components/Sidebar.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLocation } from "react-router-dom"; // 👈 importa
import {
  Home,
  Folder,
  Assignment,
  Schedule,
  MonetizationOn,
  AssignmentTurnedIn,
  PeopleAlt,
  Group,
  AccountBalance,
} from "@mui/icons-material";
import { ROUTES_PATH } from '../../routes/routePaths';
import useAuthStore from '../../context/authStore';
import { UserRoles } from '../../types/UserRoles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick: (item: string) => void;
}

interface IMenuItem {
  text: string;
  icon: JSX.Element;
  profiles?: UserRoles[];
  path: string;
  section: "user" | "admin";
}

const menuItems: IMenuItem[] = [
  // MENUS DE USUÁRIO
  { text: 'Início', icon: <Home />, path: ROUTES_PATH.Home, section: "user" },
  { text: 'Meus Processos', icon: <Assignment />, path: ROUTES_PATH.ProcessMine, section: "user" },
  { text: 'Meus TimeSheets', icon: <Schedule />, path: ROUTES_PATH.MyTimeSheets, section: "user" },
  { text: 'Meus Honorários', icon: <MonetizationOn />, path: ROUTES_PATH.MyHonorarios, section: "user" },

  // MENUS DE ADMIN
  { text: 'Processos', icon: <AssignmentTurnedIn />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Process, section: "admin" },
  { text: 'Clientes', icon: <PeopleAlt />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Client, section: "admin" },
  { text: 'Colaboradores', icon: <Group />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Colaborador, section: "admin" },
  { text: 'TimeSheets', icon: <Schedule />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.TimeSheet, section: "admin" },
  { text: 'Honorários', icon: <MonetizationOn />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Honorario, section: "admin" },
  { text: 'Despesas', icon: <AccountBalance />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Despesas, section: "admin" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, handleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAuthStore((state) => state.user);
  const location = useLocation(); // 👈 pega rota atual

  const hasPermission = (itemRoles?: UserRoles[]) =>
    !itemRoles || itemRoles.some(role => user?.groups.includes(role));

  const userMenus = menuItems.filter(item => item.section === "user");
  const adminMenus = menuItems.filter(item => item.section === "admin" && hasPermission(item.profiles));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />

      {/* MENUS DE USUÁRIO */}
      <List subheader={<ListSubheader disableSticky>Meu Espaço</ListSubheader>}>
        {userMenus.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              key={index}
              onClick={() => handleClick(item.path)}
              sx={{
                cursor: 'pointer',
                bgcolor: isActive ? theme.palette.action.selected : 'transparent',
                borderRadius: 2,
              }}
            >
              <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* MENUS ADMIN */}
      {adminMenus.length > 0 && (
        <List subheader={<ListSubheader disableSticky>Administração</ListSubheader>}>
          {adminMenus.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                key={index}
                onClick={() => handleClick(item.path)}
                sx={{
                  cursor: 'pointer',
                  bgcolor: isActive ? theme.palette.action.selected : 'transparent',
                  borderRadius: 2,
                }}
              >
                <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Drawer>
  );
};

export default Sidebar;
