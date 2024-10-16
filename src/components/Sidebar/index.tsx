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
import { UserRole } from '../../routes/userRole';

interface SidebarProps {
  userProfile: string[];
  isOpen: boolean;
  onClose: () => void;
  handleClick: () => void;
}


interface IMenuItem {
    text: string;
    icon: JSX.Element;
    profiles: string[];
}

const menuItems: IMenuItem[] = [
    { text: 'Home', icon: <Home />, profiles: ['admin', 'editor', 'viewer'] },
    { text: 'About', icon: <Info />, profiles: ['admin', 'editor'] },
    { text: 'Settings', icon: <Settings />, profiles: ['admin'] },
    { text: 'Restricted', icon: <Lock />, profiles: ['admin'] },
];


const Sidebar: React.FC<SidebarProps> = ({ userProfile, isOpen, onClose, handleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const hasPermission = (itemRoles: string[]) => {
    return itemRoles.some(role => userProfile.includes(role));
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
            <ListItem sx={{ cursor: 'pointer' }} key={index} onClick={handleClick} >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
