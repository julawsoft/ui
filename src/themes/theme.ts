// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul
    },
    secondary: {
      main: "#9c27b0", // roxo
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h6: { fontWeight: 600 },
    body1: { fontSize: "0.95rem" },
  },
  shape: {
    borderRadius: 2,
  },
});

export default theme;
