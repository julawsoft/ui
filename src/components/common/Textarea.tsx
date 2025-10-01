// src/components/common/Textarea.tsx
import React from "react";
import { TextField } from "@mui/material";

interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <TextField
      label={label}
      multiline
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      variant="outlined"
    />
  );
};

export default Textarea;
