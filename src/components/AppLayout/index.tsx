import React from 'react';
import { Box, CssBaseline, useTheme, useMediaQuery, Toolbar } from '@mui/material';
import TopBar from '../Topbar/intex';
import Sidebar from '../Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../context/authStore';

interface AppLayoutProps {
  userProfile: string[];
  isDrawerOpen: boolean;
  onDrawerToggle: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ userProfile, isDrawerOpen, onDrawerToggle }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()


  const handleClick = (menu: string) => {
    console.log('Menu item clicked', menu);
    return navigate(menu);
  };

  if (user == null)
    location.href = '/login'

  return (
    <>
      {user && user.isLogged ?
        <>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBar onDrawerToggle={onDrawerToggle} />
            <Sidebar userProfile={userProfile} isOpen={isDrawerOpen} onClose={onDrawerToggle} handleClick={handleClick} />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
                transition: 'margin-left 0.5s',
                marginLeft: !isMobile && isDrawerOpen ? '240px' : '0',
              }}
            >
              <Toolbar />
              <Outlet />
            </Box>
          </Box>
        </> : null}
    </>
  );
};

export default AppLayout;
