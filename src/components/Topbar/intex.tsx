import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Badge, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LoginService } from '../../services/Login';
import { setUserLogged } from '../../utils/cookies';
import { toast } from 'react-toastify';
import useAuthStore from '../../context/authStore';
import Chronometer from '../Chronometer';
import ChronometerCompact from '../Chronometer/ChronometerCompact';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';

interface TopBarProps {
  onDrawerToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onDrawerToggle }) => {

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // Garante que o TopBar esteja acima do Drawer
      }}
    >
      <Toolbar>
        {/* Botão de Menu */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Título do Aplicativo */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          JULAW
        </Typography>

        {/* Notificações e Perfil de Usuário */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          <ChronometerCompact />
          <NotificationMenu />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
