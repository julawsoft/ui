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

import { UserProfile } from '../../routes/userProfile';

interface SidebarProps {
  userProfile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  handleClick: () => void;
}


interface IMenuItem {
    text: string;
    icon: JSX.Element;
    profiles: UserProfile[];
}

const menuItems: IMenuItem[] = [
    { text: 'Home', icon: <Home />, profiles: ['Admin', 'Editor', 'Viewer'] },
    { text: 'About', icon: <Info />, profiles: ['Admin', 'Editor'] },
    { text: 'Settings', icon: <Settings />, profiles: ['Admin'] },
    { text: 'Restricted', icon: <Lock />, profiles: ['Admin'] },
];


const Sidebar: React.FC<SidebarProps> = ({ userProfile, isOpen, onClose, handleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          .filter(item => item.profiles.includes(userProfile))
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
