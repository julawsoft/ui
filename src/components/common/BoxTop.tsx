// src/components/common/BoxTop.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { ButtonBaseProps } from './ButtonBase';
import PrimaryButton from './PrimaryButton';

interface BoxTopProps {
  title: string;
  buttonText?: string;
  buttonProps?: ButtonBaseProps;
}

const BoxTop: React.FC<BoxTopProps> = ({ title, buttonText, buttonProps }) => {
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

      {buttonText && <PrimaryButton {...buttonProps}>{buttonText}</PrimaryButton>}
    </Box>
  );
};

export default BoxTop;
