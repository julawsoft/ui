// src/components/common/SelectBox.tsx
import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Option {
  label: string;
  value: string | number;
}

interface SelectBoxProps {
  label: string;
  value: string | number;
  onChange: (e: any) => void;
  options: Option[];
  fullWidth?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({ label, value, onChange, options, fullWidth = true }) => {
  return (
    <FormControl fullWidth={fullWidth} size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
