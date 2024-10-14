// src/pages/Restricted.tsx
import React from 'react';
import { Typography } from '@mui/material';

const Restricted: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Restricted Page</Typography>
      <Typography paragraph>
        This page is only accessible to Admins.
      </Typography>
    </div>
  );
};

export default Restricted;
