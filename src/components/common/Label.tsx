// src/components/common/Label.tsx
import React from "react";
import { Typography } from "@mui/material";

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <Typography variant="body2" fontWeight="bold" gutterBottom>
      {text}
    </Typography>
  );
};

export default Label;
