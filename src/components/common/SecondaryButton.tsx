// src/components/common/SecondaryButton.tsx
import React from "react";
import ButtonBase from "./ButtonBase";

const SecondaryButton: React.FC<React.ComponentProps<typeof ButtonBase>> = (props) => {
  return <ButtonBase {...props} color="secondary" variant="contained" />;
};

export default SecondaryButton;
