import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface Notification {
  id: number;
  title: string;
  description: string;
  read: boolean;
}

{/* Funcao do back que vai trazer os dados getTarefaByColaboradorGestorId -sao tarefas do user */}

const NotificationMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Exemplo de notificações mockadas (poderá vir do backend futuramente)
  const [notifications, setNotifications] = useState<Notification[]>([
   /* { id: 1, title: "Nova tarefa atribuída", description: "Verifique o seu painel", read: false },
    { id: 2, title: "Atualização do sistema", description: "Versão 1.2.3 instalada", read: false },
    { id: 3, title: "Reunião agendada", description: "Hoje às 14h30", read: true },
     */
  ]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            overflow: "visible",
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 280,
          },
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            Notificações
          </Typography>
          {notifications.length > 0 && (
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", textAlign: "right" }}
              onClick={handleMarkAllAsRead}
            >
              Marcar todas como lidas
            </Typography>
          )}
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              Sem notificações
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleMarkAsRead(notification.id)}
              sx={{
                bgcolor: notification.read ? "background.paper" : "action.hover",
                borderLeft: notification.read ? "none" : "4px solid #1976d2",
                alignItems: "flex-start",
              }}
            >
              <ListItemText
                primary={notification.title}
                secondary={notification.description}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default NotificationMenu;
