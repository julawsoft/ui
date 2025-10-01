import React from "react";
import { Typography, CircularProgress, Box } from "@mui/material";

interface DataStateProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
}

const DataState: React.FC<DataStateProps> = ({
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyMessage = "Nenhum dado encontrado",
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <CircularProgress size={24} />
        <Typography ml={2}>Carregando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" p={2}>
        {error}
      </Typography>
    );
  }

  if (isEmpty) {
    return (
      <Typography textAlign="center" p={2}>
        {emptyMessage}
      </Typography>
    );
  }

  return null;
};

export default DataState;
