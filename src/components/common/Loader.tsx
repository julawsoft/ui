// src/components/common/Loader.tsx
import React from "react";
import { CircularProgress, Box } from "@mui/material";

interface LoaderProps {
  fullscreen?: boolean;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ fullscreen = false, size = 40 }) => {
  if (fullscreen) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress size={size} />
      </Box>
    );
  }

  return <CircularProgress size={size} />;
};

export default Loader;
