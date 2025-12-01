import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Print,
  Share,
  MoreVert,
  ExpandMore,
} from "@mui/icons-material";

interface Timesheet {
  id: number;
  description: string;
  tag: string;
  amount: number;
  user: string;
  start: string;
  end: string;
  duration: string;
  date: string;
}

export default function TimesheetTable() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    // Simulação de API
    setTimeout(() => {
      setTimesheets([
        {
          id: 1,
          description: "Revisão do contrato de parceria",
          tag: "PGR",
          amount: 0.0,
          user: "Anselmo Cambinza",
          start: "07:21",
          end: "07:21",
          duration: "00:00:46",
          date: "Hoje",
        },
        {
          id: 2,
          description: "Atualização de relatórios financeiros",
          tag: "PGR",
          amount: 0.0,
          user: "Anselmo Cambinza",
          start: "07:20",
          end: "07:20",
          duration: "00:00:03",
          date: "Hoje",
        },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const totalDuration = () => {
    const totalSeconds = timesheets.reduce((acc, t) => {
      const [h, m, s] = t.duration.split(":").map(Number);
      return acc + h * 3600 + m * 60 + s;
    }, 0);
    const h = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleExport = (type: string) => {
    alert(`Exportar para ${type.toUpperCase()}`);
    handleMenuClose();
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, background: "#f9fafb" }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 1.5,
          borderBottom: "1px solid #e0e0e0",
          background: "#eef1f4",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Typography variant="body1" sx={{ color: "#333" }}>
          <strong>Total:</strong> {totalDuration()} &nbsp; | &nbsp;
          <strong>Billable:</strong> {totalDuration()} &nbsp; | &nbsp;
          <strong>Amount:</strong> 0.00 USD
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ExpandMore />}
            onClick={handleMenuOpen}
          >
            Exportar
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleExport("csv")}>CSV</MenuItem>
            <MenuItem onClick={() => handleExport("excel")}>Excel</MenuItem>
          </Menu>

          <IconButton>
            <Print fontSize="small" />
          </IconButton>
          <IconButton>
            <Share fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Tabela */}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "#fff" }}>
              <TableCell padding="checkbox">
                <Checkbox size="small" />
              </TableCell>
              <TableCell>TIME ENTRY</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>USER</TableCell>
              <TableCell>TIME</TableCell>
              <TableCell>DURATION</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : (
              timesheets.map((t) => (
                <TableRow
                  key={t.id}
                  sx={{
                    background: "#fff",
                    "&:hover": { backgroundColor: "#f3f6f9" },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body2">{t.description}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "primary.main",
                          display: "flex",
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            background: "#43a047",
                            borderRadius: "50%",
                            marginRight: 4,
                          }}
                        ></span>
                        {t.tag}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{t.amount.toFixed(2)}</TableCell>
                  <TableCell>{t.user}</TableCell>
                  <TableCell>
                    {t.start} - {t.end}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {t.date}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{t.duration}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
