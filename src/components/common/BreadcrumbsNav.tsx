// src/components/common/BreadcrumbsNav.tsx
import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  path?: string; // se não tiver path, será apenas texto
}

interface BreadcrumbsNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography key={index} color="text.primary">
            {item.label}
          </Typography>
        ) : (
          <Link
            key={index}
            color="inherit"
            underline="hover"
            sx={{ cursor: "pointer" }}
            onClick={() => item.path && navigate(item.path)}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
