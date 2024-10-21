import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Badge, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { LoginService } from '../../services/Login';
import { setUserLogged } from '../../utils/cookies';
import { toast } from 'react-toastify';
import useAuthStore from '../../context/authStore';

interface TopBarProps {
  onDrawerToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onDrawerToggle }) => {
  
  const setUser = useAuthStore((state) => state.setUser)
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);

  // Abrir e fechar o menu de notificações
  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  // Abrir e fechar o menu de perfil do usuário
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };


  const handleProfileSair = async () => {
    try {

      const response = await LoginService.logout()

      if (response && response.response.statusCode === 200) {
        setUserLogged({
          name: '',
          groups: [''],
          roles: [''],
          accessToken: '',
          refreshToken: '',
          isLogged: false
        })

        setUser({
          name: '',
          groups: [''],
          roles: [''],
          accessToken: '',
          refreshToken: '',
          isLogged: false,
          id: '',
          email: ''
        })

        location.href = '/login'

      } else {
        toast.error(response.response.message)
      }

    } catch (err: any) {
      toast.error(err.message)
    }
  }

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
          APP SEC
        </Typography>

        {/* Notificações e Perfil de Usuário */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Ícone de Notificações com Badge e Menu */}
          <IconButton color="inherit" onClick={handleNotificationsClick}>
            <Badge badgeContent={4} color="error">  {/* O número 4 pode ser dinâmico */}
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Menu dropdown para Notificações */}
          <Menu
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleNotificationsClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleNotificationsClose}>Notification 1</MenuItem>
            <MenuItem onClick={handleNotificationsClose}>Notification 2</MenuItem>
            <MenuItem onClick={handleNotificationsClose}>Notification 3</MenuItem>
            <MenuItem onClick={handleNotificationsClose}>View All</MenuItem>
          </Menu>

          {/* Avatar do Perfil do Usuário com Menu */}
          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar alt="User Profile" src="/path-to-profile-image.jpg" />  {/* Insira a imagem do usuário */}
          </IconButton>

          {/* Menu dropdown para Perfil do Usuário */}
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileClose}>My Account</MenuItem>
            <MenuItem onClick={handleProfileSair}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
