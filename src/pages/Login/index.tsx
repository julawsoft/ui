// Login.tsx
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Container, CssBaseline, CardMedia } from '@mui/material';
import { LoginService } from '../../services/Login';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '../../routes/routePaths';
import { setUserLogged } from '../../utils/cookies';
import useAuthStore from '../../context/authStore';

import logo from '../../assets/images/julaw-logo.png';

const Login: React.FC = () => {

  const setUser = useAuthStore((state) => state.setUser)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate()

  useEffect(() => {
    /*setUserLogged({
      name: '',
      groups: '',
      roles: [],
      accessToken: '',
      refreshToken: '',
      isLogged: false
    })*/
  }, [])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {

      const response = await LoginService.login({ username: email, password })

      if (response && response.status === 200) {
        const userResponse = response.data

        let groupsMap =  userResponse.funcao
        let rolesMap = userResponse.auth.roles ?? []

        console.log("here...groupsMap::  ", groupsMap)
        console.log("here...rolesMap::  ", rolesMap)

        setUserLogged({
          name: userResponse.auth.userInfo.name,
          groups: groupsMap,
          roles: [...rolesMap],
          accessToken: userResponse.auth.accessToken,
          refreshToken: userResponse.auth.refreshToken,
          isLogged: true
        })

        setUser({
          name: userResponse.auth.userInfo.name,
          groups: groupsMap,
          roles: [...rolesMap],
          accessToken: userResponse.auth.accessToken,
          refreshToken: userResponse.auth.refreshToken,
          isLogged: true,
          id: userResponse.id,
          email: userResponse.auth.userInfo.email
        })

        setTimeout(() => {
          navigate(ROUTES_PATH.Home)
        }, 1000)

      } else {
        toast.error(response.response.message)
      }

    } catch (err: any) {
      toast.error(err.message)
    }

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      
        <CardMedia
          component="img"
          height="100px"
          width={"100px"}
          image={logo}
          alt="Logo Julaw"
          sx={{
            width: "100px", // Largura fixa de 100px
            height: "100px", // Altura fixa para manter um formato quadrado
            objectFit: "cover", // Evita distorção, cortando partes da imagem se necessário
          }}
        />

        <Typography component="h1" variant="h5" mt={10}>
          JULAW
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuário"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
