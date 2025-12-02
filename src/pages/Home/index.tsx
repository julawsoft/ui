import React from 'react';
import { Grid, Typography, Card, CardContent, CardActionArea, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Assignment,
  Schedule,
  MonetizationOn,
  PeopleAlt,
  Group,
  AccountBalance,
} from '@mui/icons-material';
import useAuthStore from '../../context/authStore';
import { ROUTES_PATH } from '../../routes/routePaths';
import { UserRoles } from '../../types/UserRoles';

interface ICard {
  title: string;
  description: string;
  icon: JSX.Element;
  path: string;
  roles?: UserRoles[];
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useAuthStore((state) => state.user);

  const cards: ICard[] = [
    { title: "Meus Processos", description: "Acompanhe seus processos ativos", icon: <Assignment fontSize="large" />, path: ROUTES_PATH.ProcessMine },
    { title: "Meus TimeSheets", description: "Controle suas horas trabalhadas", icon: <Schedule fontSize="large" />, path: ROUTES_PATH.MyTimeSheets },
    { title: "Meus Honorários", description: "Consulte os honorários lançados", icon: <MonetizationOn fontSize="large" />, path: ROUTES_PATH.MyHonorarios },

    { title: "Processos", description: "Gerencie todos os processos", icon: <Assignment fontSize="large" />, path: ROUTES_PATH.Process, roles: [UserRoles.ADMINISTRATIVO] },
    { title: "Clientes", description: "Lista e cadastro de clientes", icon: <PeopleAlt fontSize="large" />, path: ROUTES_PATH.Client, roles: [UserRoles.ADMINISTRATIVO] },
    { title: "Colaboradores", description: "Gerencie sua equipe", icon: <Group fontSize="large" />, path: ROUTES_PATH.Colaborador, roles: [UserRoles.ADMINISTRATIVO] },
    { title: "TimeSheets", description: "Relatórios de horas", icon: <Schedule fontSize="large" />, path: ROUTES_PATH.TimeSheet, roles: [UserRoles.ADMINISTRATIVO] },
    { title: "Honorários", description: "Controle financeiro", icon: <MonetizationOn fontSize="large" />, path: ROUTES_PATH.Honorario, roles: [UserRoles.ADMINISTRATIVO] },
    { title: "Despesas", description: "Gerencie despesas e contas", icon: <AccountBalance fontSize="large" />, path: ROUTES_PATH.Despesas, roles: [UserRoles.ADMINISTRATIVO] },
  ];

  // Função para checar permissão (caso tenha roles definidas no card)
  const hasPermission = (roles?: UserRoles[]) =>
    !roles || roles.some(role => user?.groups.includes(role));

  return (
    <div style={{ padding: theme.spacing(3) }}>
      <Typography variant="h5" gutterBottom>
        Bem-vindo, {user?.name || "Usuário"} 👋
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Escolha uma das opções abaixo para começar:
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
        </Box>
        <Typography>Página em construção.</Typography>
      </Grid>
    </div>
  );
};

export default Home;
