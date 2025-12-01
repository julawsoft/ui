import { AppBar, Toolbar, IconButton, Typography, Box,  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          JULAW
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <NotificationMenu />
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
