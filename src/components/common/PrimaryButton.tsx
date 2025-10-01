// src/components/common/PrimaryButton.tsx
import React from "react";
import ButtonBase from "./ButtonBase";

const PrimaryButton: React.FC<React.ComponentProps<typeof ButtonBase>> = (props) => {
  return <ButtonBase {...props} color="primary" variant="contained" />;
};

export default PrimaryButton;
