// Login.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, CssBaseline } from '@mui/material';
import { LoginService } from '../../services/Login';
import { setUserLogged } from '../../utils/cookies';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('admin@appsec.ms');
  const [password, setPassword] = useState<string>('654321');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password });

    try {

      const response = await LoginService.login({email, password})

      console.log(response)

      if(response && response.statusCode === 200) {
        console.log(">>>> ", response)
        // setUserLogged({
        //   name: "User de Teste",
        //   groups: ['email', 'password'],
        //   role: ['password']
        // })

      }else{
        alert("Erro to login")
      }      
    
    }catch(e){
      console.log("Erro do login >>><<< ",e)
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
