// src/components/common/Input.tsx
import React from "react";
import { TextField } from "@mui/material";

interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, type = "text", fullWidth = true }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth={fullWidth}
      size="small"
    />
  );
};

export default Input;
