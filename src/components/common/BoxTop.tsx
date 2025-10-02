// src/components/common/BoxTop.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface BoxTopProps {
  title: string;
  actions?: React.ReactNode;
}

const BoxTop: React.FC<BoxTopProps> = ({ title, actions }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        p: 2,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", gap: 1 }}>
        {actions}
      </Box>
    </Box>
  );
};

export default BoxTop;
