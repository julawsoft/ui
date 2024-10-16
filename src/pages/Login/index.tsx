// Login.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import { LoginService } from '../../services/Login';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '../../routes/routePaths';
import { setUserLogged } from '../../utils/cookies';
import useAuthStore from '../../context/authStore';

const Login: React.FC = () => {
  
  const setUser  = useAuthStore((state) => state.setUser)

  const [email, setEmail] = useState<string>('user@cetim.ms');
  const [password, setPassword] = useState<string>('654321');

  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {

      const response = await LoginService.login({email, password})

      if(response && response.response.statusCode === 200) {

        const userResponse = response.data

        let groupsMap = userResponse.userInfo.groups.map((group: string) => group.replace('/', ''))

        console.log(groupsMap)
       
        setUserLogged({
          name: `User Logado`,
          groups: [...groupsMap],
          roles: ['password'],
          accessToken: userResponse.accessToken,
          refreshToken: userResponse.refreshToken,
          isLogged: true
        })

        setUser(
          {
            name: `User Logado`,
            groups: [...groupsMap],
            roles: ['password'],
            accessToken: userResponse.accessToken,
            refreshToken: userResponse.refreshToken,
            isLogged: true,
            id: '',
            email: ''
          }
        )


        navigate(ROUTES_PATH.Home)
  
      } else {
        toast.error(response.response.message)
      }      
    
    }catch(err: any){
      console.log(String(err))
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
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            type='email'
            fullWidth
            id="email"
            label="E-mail"
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
