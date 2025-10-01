// src/components/common/ButtonBase.tsx
import React from "react";
import { Button } from "@mui/material";

interface ButtonBaseProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
  color?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning";
  variant?: "contained" | "outlined" | "text";
}

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
  color = "primary",
  variant = "contained",
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
    >
      {children}
    </Button>
  );
};

export default ButtonBase;
