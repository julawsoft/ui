// src/pages/Home.tsx
import React from 'react';
import { Typography } from '@mui/material';
import useAuthStore from '../../context/authStore';

const Home: React.FC = () => {

  const user  = useAuthStore((state) => state.user)

  console.log("user logado ", user)


  return (
    <div>
      <Typography variant="h4">Home Page</Typography>
      <Typography paragraph>
        Welcome to the Home page!
      </Typography>
    </div>
  );
};

export default Home;
