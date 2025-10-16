import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface Loop {
  id: number;
  start: string;
  end: string;
  duration: string;
}

const ChronometerCompact: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loops, setLoops] = useState<Loop[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  // ⏳ Formatador de tempo
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // 🚀 Recuperar estado anterior do localStorage
  useEffect(() => {
    const savedLoops = localStorage.getItem("chrono:loops");
    const savedTime = localStorage.getItem("chrono:time");
    const savedRunning = localStorage.getItem("chrono:isRunning");
    const savedStart = localStorage.getItem("chrono:startTime");

    if (savedLoops) setLoops(JSON.parse(savedLoops));
    if (savedTime) setTime(Number(savedTime));

    const running = savedRunning === "true";
    const start = savedStart ? Number(savedStart) : null;

    if (running && start) {
      setIsRunning(true);
      setStartTime(start);
      timerRef.current = setInterval(() => {
        setTime(Date.now() - start);
      }, 1000);
    } else if (start) {
      setStartTime(start);
    }
  }, []);

  // 💾 Salvar tempo e estado
  useEffect(() => {
    localStorage.setItem("chrono:time", time.toString());
  }, [time]);

  useEffect(() => {
    localStorage.setItem("chrono:isRunning", isRunning.toString());
  }, [isRunning]);

  useEffect(() => {
    if (startTime) {
      localStorage.setItem("chrono:startTime", startTime.toString());
    } else {
      localStorage.removeItem("chrono:startTime");
    }
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem("chrono:loops", JSON.stringify(loops));
  }, [loops]);

  // ▶️ Iniciar
  const handleStart = () => {
    if (!isRunning) {
      const baseTime = Date.now() - time;
      setStartTime(baseTime);
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime(Date.now() - baseTime);
      }, 1000);
    }
  };

  // ⏸️ Pausar
  const handlePause = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
      setTime(Date.now() - (startTime ?? Date.now()));
    }
  };

  // ⏹️ Parar
  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const now = new Date();
    const duration = formatTime(time);
    const newLoop: Loop = {
      id: loops.length + 1,
      start: startTime ? new Date(startTime).toLocaleString() : "-",
      end: now.toLocaleString(),
      duration,
    };

    setLoops((prev) => [...prev, newLoop]);
    setIsRunning(false);
    setTime(0);
    setStartTime(null);

    // limpar estado
    localStorage.removeItem("chrono:startTime");
    localStorage.setItem("chrono:isRunning", "false");
    localStorage.setItem("chrono:time", "0");
  };

  // 🧹 Limpar histórico
  const handleClearHistory = () => {
    setLoops([]);
    localStorage.removeItem("chrono:loops");
  };

  // 📋 Menu control
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <AccessTimeIcon />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {formatTime(time)}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { width: 310, p: 1.5 },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Cronômetro
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center" mb={1}>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={handleStart}
            disabled={isRunning}
          >
            Iniciar
          </Button>
          <Button
            variant="contained"
            size="small"
            color="warning"
            onClick={handlePause}
            disabled={!isRunning}
          >
            Pausar
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleStop}
            disabled={time === 0 && !startTime}
          >
            Parar
          </Button>
        </Stack>

        <Divider sx={{ mb: 1 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2">Histórico</Typography>
          {loops.length > 0 && (
            <IconButton size="small" onClick={handleClearHistory} color="error">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {loops.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Nenhum loop registrado.
          </Typography>
        ) : (
          loops
            .slice()
            .reverse()
            .map((loop) => (
              <MenuItem
                key={loop.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  whiteSpace: "normal",
                }}
              >
                <Typography variant="body2">
                  <strong>{loop.duration}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {loop.start} → {loop.end}
                </Typography>
              </MenuItem>
            ))
        )}
      </Menu>
    </Box>
  );
};

export default ChronometerCompact;
