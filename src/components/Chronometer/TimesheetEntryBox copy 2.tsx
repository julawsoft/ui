import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { PlayArrow, Stop, AddCircleOutline, Timer, EditCalendar } from "@mui/icons-material";
import dayjs from "dayjs";
import type { ITasks } from "../../schema/InterfaceTarefa";

interface Timesheet {
  modo: "cronometro" | "manual";
  tarefaId?: number;
  descricao: string;
  data: string;
  horaInicio?: string;
  horaFim?: string;
  horasTrabalhadas?: number;
}

interface ITimeSheetProps {
  tarefas : ITasks[]
  handleSaveTimeSheet: (data: Timesheet) => void
}
interface Loop {
  id: number;
  start: string;
  end: string;
  duration: string;
}

export default function TimesheetRegistro({
  tarefas,
  handleSaveTimeSheet
}: ITimeSheetProps) {

  const [modo, setModo] = useState<"cronometro" | "manual">("cronometro");
  const [descricao, setDescricao] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [inicio, setInicio] = useState<number | null>(null);
  const [duracao, setDuracao] = useState("00:00:00");

  const [time, setTime] = useState<number>(0)
  const [loops, setLoops] = useState<Loop[]>([])

  // Modo manual
  const [tarefaId, setTarefaId] = useState<number | "">("");
  const [data, setData] = useState(dayjs().format("YYYY-MM-DD"));
  const [horas, setHoras] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Cronômetro
  useEffect(() => {

    // let timer: NodeJS.Timeout;

    const savedLoops = localStorage.getItem("chrono:loops")
    const savedTime = localStorage.getItem("chrono:time")
    const savedRunning = localStorage.getItem("chrono:isRunning")
    const savedStart = localStorage.getItem("chrono:startTime")

    if(savedLoops) setLoops(JSON.parse(savedLoops))
    if(savedTime) setTime(JSON.parse(savedTime))

    const running = savedRunning === "true"
    const inicio = savedStart ? Number(savedStart) : null


    if (running && inicio) {
      
      setIsRunning(true)
      setStartTime(inicio)

      timerRef.current = setInterval(() => {
        const diff = Math.floor((Date.now() - inicio) / 1000);
        const h = String(Math.floor(diff / 3600)).padStart(2, "0");
        const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
        const s = String(diff % 60).padStart(2, "0");
        setDuracao(`${h}:${m}:${s}`);
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isRunning, inicio]);

  const handleStart = () => {
    setIsRunning(true);
    setInicio(Date.now());
  };

  const handleStop = () => {

    setIsRunning(false);
    const agora = dayjs();
    const inicioHora = dayjs(inicio);
    const diffHoras = agora.diff(inicioHora, "minute") / 60;

    const novoRegistro: Timesheet = {
      modo: "cronometro",
      descricao,
      tarefaId: Number(tarefaId),
      data: agora.format("YYYY-MM-DD"),
      horaInicio: inicioHora.format("HH:mm:ss"),
      horaFim: agora.format("HH:mm:ss"),
      horasTrabalhadas: parseFloat(diffHoras.toFixed(2)),
    };

    console.log("✅ Timesheet (cronômetro): ", novoRegistro);
    return 0
    setDescricao("");
    setDuracao("00:00:00");

  };

  const handleAddManual = () => {

    if (!tarefaId || horas <= 0) return alert("Selecione uma tarefa e defina as horas!");
    const novoRegistro: Timesheet = {
      modo: "manual",
      tarefaId: Number(tarefaId),
      descricao,
      data,
      horasTrabalhadas: horas,
    };
    console.log("✅ Timesheet (manual):", novoRegistro);
    handleSaveTimeSheet(novoRegistro)
    setTimeout(()=> {
      setDescricao("");
      setHoras(0);
      setTarefaId("");
    }, 2000)
  };

  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 1.5,
        background: "#fff",
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {/* Campo de descrição */}
      <TextField
        placeholder={
          modo === "cronometro" ? "O que está a trabalhar?" : "Descrição"
        }
        variant="outlined"
        size="small"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        sx={{ flex: 1 }}
      />

      {/* Seletor de tarefa */}
      <FormControl sx={{ minWidth: 220 }}>
        <InputLabel>Tarefa</InputLabel>
        <Select
          size="small"
          value={tarefaId}
          label="Tarefa"
          onChange={(e) => setTarefaId(Number(e.target.value))}
        >
          {tarefas.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.descricao}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Campos de acordo com o modo */}
      {modo === "cronometro" ? (
        <>
          <Typography
            sx={{ width: 90, textAlign: "center", fontWeight: "bold", color: "#333" }}
          >
            {duracao}
          </Typography>
          <Button
            variant="contained"
            disabled={!tarefaId}
            color={isRunning ? "error" : "primary"}
            startIcon={isRunning ? <Stop /> : <PlayArrow />}
            onClick={isRunning ? handleStop : handleStart}
            sx={{ minWidth: 100 }}
          >
            {isRunning ? "STOP" : "START"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={duracao === '00:00:00'}
            startIcon={<AddCircleOutline />}
            onClick={handleAddManual}
            sx={{ minWidth: 110 }}
          >
            Adicionar
          </Button>
        </>
      ) : (
        <>
          <TextField
            type="date"
            size="small"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <TextField
            type="number"
            size="small"
            label="Horas"
            value={horas}
            onChange={(e) => setHoras(Number(e.target.value))}
            sx={{ width: 90 }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleAddManual}
            sx={{ minWidth: 110 }}
          >
            Adicionar
          </Button>
        </>
      )}

      {/* Botões de alternar modo (lado direito) */}
      <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
        <Tooltip title="Modo Cronômetro">
          <IconButton
            color={modo === "cronometro" ? "primary" : "default"}
            onClick={() => setModo("cronometro")}
          >
            <Timer />
          </IconButton>
        </Tooltip>
        <Tooltip title="Modo Manual">
          <IconButton
            color={modo === "manual" ? "primary" : "default"}
            onClick={() => setModo("manual")}
          >
            <EditCalendar />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}
