// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#9c27b0" },
    background: { default: "#f4f6f8", paper: "#ffffff" },
  },

  // 🔥 REDUZ TUDO
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 12, // <<< diminui toda a escala base
    h6: { fontSize: "0.95rem", fontWeight: 600 },
    body1: { fontSize: "0.85rem" },
    body2: { fontSize: "0.78rem" },
  },

  // 🔥 COMPONENTES MAIS COMPACTOS
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          padding: "4px 10px",
          minHeight: "28px",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        margin: "dense",
        size: "small",
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "0.8rem",
          padding: "6px 10px",
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.8rem",
          padding: "6px 8px",
        },
        head: {
          fontSize: "0.78rem",
          fontWeight: 600,
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "0.8rem",
        },
      },
    },
  },

  shape: { borderRadius: 2 },
});

export default theme;
