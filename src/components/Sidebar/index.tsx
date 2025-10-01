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
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Home, Folder } from "@mui/icons-material";
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
  profiles?: UserRoles[]; // só necessário para admin
  path: string;
  section: "user" | "admin";
}

const menuItems: IMenuItem[] = [
  // MENUS DE USUÁRIO (todos podem ver)
  { text: 'Início', icon: <Home />, path: ROUTES_PATH.Home, section: "user" },
  { text: 'Meus Processos', icon: <Folder />, path: ROUTES_PATH.ProcessMine, section: "user" },
  { text: 'Meus TimeSheets', icon: <Folder />, path: ROUTES_PATH.MyTimeSheets, section: "user" },
  { text: 'Meus Honorários', icon: <Folder />, path: ROUTES_PATH.MyHonorarios, section: "user" },
  
  // MENUS DE ADMIN (restritos por perfil)
  { text: 'Processos', icon: <Folder />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Process, section: "admin" },
  { text: 'Clientes', icon: <PeopleAltIcon />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Client, section: "admin" },
  { text: 'Colaboradores', icon: <PeopleAltIcon />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Employee, section: "admin" },
  { text: 'TimeSheets', icon: <PeopleAltIcon />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.TimeSheet, section: "admin" },
  { text: 'Honorários', icon: <PeopleAltIcon />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Honorario, section: "admin" },
  { text: 'Despesas', icon: <AccountBalanceIcon />, profiles: [UserRoles.ADMINISTRATIVO], path: ROUTES_PATH.Account, section: "admin" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, handleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAuthStore((state) => state.user);

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
      
      {/* MENUS DE USUÁRIO (todos têm acesso) */}
      <List subheader={<ListSubheader disableSticky>Meu Espaço</ListSubheader>}>
        {userMenus.map((item, index) => (
          <ListItem sx={{ cursor: 'pointer' }} key={index} onClick={() => handleClick(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      {/* MENUS ADMIN (só quem tem permissão) */}
      {adminMenus.length > 0 && (
        <List subheader={<ListSubheader disableSticky>Administração</ListSubheader>}>
          {adminMenus.map((item, index) => (
            <ListItem sx={{ cursor: 'pointer' }} key={index} onClick={() => handleClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
};

export default Sidebar;
