// src/pages/Restricted.tsx
import React from 'react';
import { Typography } from '@mui/material';

const ProcessMine: React.FC = () => {
  return (
    <div>
      <Typography variant="h4">Processos Page</Typography>
      <Typography>
        This page is only accessible to Processos Advogados.
      </Typography>
    </div>
  );
};

export default ProcessMine;
