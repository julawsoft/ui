import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Stack,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface Loop {
  id: number;
  start: string;
  end: string;
  duration: string;
}

const Chronometer: React.FC = () => {
  const [time, setTime] = useState<number>(0); // milissegundos
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [loops, setLoops] = useState<Loop[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedLoops = localStorage.getItem("loops");
    if (savedLoops) setLoops(JSON.parse(savedLoops));

    const savedTime = localStorage.getItem("currentTime");
    if (savedTime) setTime(Number(savedTime));
  }, []);

  // Salvar tempo no localStorage enquanto roda
  useEffect(() => {
    localStorage.setItem("currentTime", time.toString());
  }, [time]);

  // Salvar histórico no localStorage
  useEffect(() => {
    localStorage.setItem("loops", JSON.stringify(loops));
  }, [loops]);

  // Formatar tempo (hh:mm:ss)
  const formatTime = (ms: number): string => {
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

  // Iniciar cronômetro
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now() - time);
      timerRef.current = setInterval(() => {
        setTime(Date.now() - (startTime ?? Date.now()));
      }, 100);
    }
  };

  // Pausar cronômetro
  const handlePause = () => {
    if (isRunning && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  };

  // Parar cronômetro e salvar loop
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
    setTime(0);
    setIsRunning(false);
    setStartTime(null);
  };

  return (
    <Card
      sx={{
        width: 380,
        p: 2,
        m: "auto",
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          ⏱️ Cronômetro
        </Typography>

        <Typography variant="h3" color="primary" gutterBottom>
          {formatTime(time)}
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleStart}
            disabled={isRunning}
          >
            Iniciar
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={handlePause}
            disabled={!isRunning}
          >
            Pausar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleStop}
            disabled={time === 0}
          >
            Parar
          </Button>
        </Stack>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1">Histórico</Typography>
          <IconButton onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={showHistory}>
          {loops.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum loop registrado ainda.
            </Typography>
          ) : (
            loops
              .slice()
              .reverse()
              .map((loop) => (
                <Box
                  key={loop.id}
                  sx={{
                    mt: 1,
                    p: 1.2,
                    borderRadius: 2,
                    bgcolor: "#f5f5f5",
                    textAlign: "left",
                  }}
                >
                  <Typography variant="subtitle2">
                    Loop {loop.id} — {loop.duration}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Início: {loop.start}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    Fim: {loop.end}
                  </Typography>
                </Box>
              ))
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default Chronometer;
