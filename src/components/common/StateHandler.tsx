import React from "react";
import { Typography, CircularProgress, Box } from "@mui/material";

interface StateHandlerProps {
  isLoading: boolean;
  error?: string | null;
  hasData: boolean;
}

const StateHandler: React.FC<StateHandlerProps> = ({ isLoading, error, hasData }) => {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={2}>
        <Typography color="error">Erro: {error}</Typography>
      </Box>
    );
  }

  if (!hasData) {
    return (
      <Box textAlign="center" p={2}>
        <Typography>Nenhuma informação encontrada!</Typography>
      </Box>
    );
  }

  return null;
};

export default StateHandler;
