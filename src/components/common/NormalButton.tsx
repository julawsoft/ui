// src/components/common/NormalButton.tsx
import React from "react";
import ButtonBase from "./ButtonBase";

const NormalButton: React.FC<React.ComponentProps<typeof ButtonBase>> = (props) => {
  return <ButtonBase {...props} color="inherit" variant="outlined" />;
};

export default NormalButton;
