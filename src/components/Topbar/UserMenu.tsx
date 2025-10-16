import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import { Logout, Settings, Person } from "@mui/icons-material";
import useAuthStore from "../../context/authStore";
import { setUserLogged } from "../../utils/cookies";

const UserMenu: React.FC = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);


  const handleProfileSair = async () => {

    return 0
    try {

      // const response = await LoginService.logout()

      //if (response && response.status === 200) {
        setUserLogged({
          name: '',
          groups: '',
          roles: [''],
          accessToken: '',
          refreshToken: '',
          isLogged: false
        })

        setUser({
          name: '',
          groups: '',
          roles: [''],
          accessToken: '',
          refreshToken: '',
          isLogged: false,
          id: '',
          email: ''
        })

        location.href = '/login'

      //} else {
     //   toast.error(response.response.message)
     // }

    } catch (err: any) {
      toast.error(err.message)
    }
  }


  return (
    <>
      <Tooltip title="Perfil">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 2,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
          }}
        >
          <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }} // ✅ Menu abaixo do avatar
      >
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileSair}> 
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
