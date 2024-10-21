// src/components/Sidebar.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Home, Info, Settings, Lock } from "@mui/icons-material";
import { ROUTES_PATH } from '../../routes/routePaths';
import useAuthStore from '../../context/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  handleClick: (item: string) => void;
}


interface IMenuItem {
    text: string;
    icon: JSX.Element;
    profiles: string[];
    path: string;
}

const menuItems: IMenuItem[] = [
    { text: 'Home', icon: <Home />, profiles: ['admin', 'editor', 'viewer'], path: ROUTES_PATH.Home },
    { text: 'About', icon: <Info />, profiles: ['admin', 'editor'], path: ROUTES_PATH.About },
    { text: 'Settings', icon: <Settings />, profiles: ['admin'], path: ROUTES_PATH.Settings},
    { text: 'Restricted', icon: <Lock />, profiles: ['admin'], path: ROUTES_PATH.Restricted },
];


const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, handleClick }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAuthStore((state) => state.user)

  const hasPermission = (itemRoles: string[]) => {
    return itemRoles.some(role => user?.groups.includes(role));
  };

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
      <List>
        {menuItems
          .filter(item => hasPermission(item.profiles))
          .map((item, index) => (
            <ListItem sx={{ cursor: 'pointer' }} key={index} onClick={() => handleClick(item.path)} >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
