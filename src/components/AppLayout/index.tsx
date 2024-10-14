// src/components/AppLayout.tsx
import React from 'react';
import { Box, CssBaseline, useTheme, useMediaQuery, Toolbar } from '@mui/material';
import TopBar from '../Topbar/intex';
import Sidebar from '../Sidebar';
import { UserProfile } from '../../routes/userProfile';
import { Outlet } from 'react-router-dom';

interface AppLayoutProps {
  userProfile: UserProfile;
  isDrawerOpen: boolean;
  onDrawerToggle: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ userProfile, isDrawerOpen, onDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = () => {
    console.log('Menu item clicked');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* TopBar com botão de menu */}
      <TopBar onDrawerToggle={onDrawerToggle} />
      
      {/* Sidebar (Drawer) */}
      <Sidebar userProfile={userProfile} isOpen={isDrawerOpen} onClose={onDrawerToggle} handleClick={handleClick} />

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          transition: 'margin-left 0.5s',
          marginLeft: !isMobile && isDrawerOpen ? '240px' : '0', // Margem apenas no desktop
        }}
      >
        {/* Adiciona o espaço para compensar a TopBar fixa */}
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
