// src/components/common/BoxCard.tsx
import React from "react";
import { Card, CardHeader, CardContent, CardActions, Divider } from "@mui/material";

interface BoxCardProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const BoxCard: React.FC<BoxCardProps> = ({ title, action, children, footer }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      {title && <CardHeader title={title} action={action} />}
      <Divider />
      <CardContent>{children}</CardContent>
      {footer && (
        <>
          <Divider />
          <CardActions>{footer}</CardActions>
        </>
      )}
    </Card>
  );
};

export default BoxCard;
