import { forwardRef } from "react";
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

const SelectBox2 = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ label, value, onChange, options, fullWidth = true }, ref) => {
    return (
      <FormControl fullWidth={fullWidth} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label={label}
          inputRef={ref} // 👈 ESSENCIAL para integração com react-hook-form
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);

// nome para facilitar debug no React DevTools
SelectBox2.displayName = "SelectBox";

export default SelectBox2;
