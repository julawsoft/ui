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
import { formatTime } from "../../utils/data";
import { toast } from "react-toastify";

interface Timesheet {
  modo: "cronometro" | "manual";
  tarefaId?: number;
  descricao: string;
  data: string;
  horaInicio?: string;
  horaFim?: string;
  horasTrabalhadas?: string;
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
  const [, setInicio] = useState<number | null>(null);

  const [time, setTime] = useState<number>(0)
  const [loops, setLoops] = useState<Loop[]>([])

  const tarefaIdLocal = Number(localStorage.getItem("chrono:tarefaId")) ?? ""
  const [tarefaId, setTarefaId] = useState<number | "">(tarefaIdLocal);
  const [data, setData] = useState(dayjs().format("YYYY-MM-DD"));
  const [horas, setHoras] = useState<number>(0);
  const [, setAnchorEl] = useState<null | HTMLElement>(null);
  const timerRef = useRef<any>(null);
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

    console.log("running" , running)
    console.log("Inicio" , inicio)

    if (running && inicio) {
      
      setIsRunning(true)
      setStartTime(inicio)

      timerRef.current = setInterval(() => {
          console.log("o timer")
          setTime(Date.now() - inicio)
      }, 1000);
    }else if(inicio) {
        setStartTime(inicio)
    }

   // return () => clearInterval(timer);

  }, []);

  useEffect(() => {
    localStorage.setItem("chrono:time", time.toString());
  }, [time])

  useEffect(() => {
      localStorage.setItem("chrono:isRunning", isRunning.toString())
  }, [isRunning])

  useEffect(() => {
    if(startTime) {
      localStorage.setItem("chrono:startTime", startTime.toString())
    }else{
      localStorage.removeItem("chrono:startTime")
    }
  }, [startTime])

    useEffect(() => {
      localStorage.setItem("chrono:loops", JSON.stringify(loops));
    }, [loops]);

  const handleStart = () => {
    if (!isRunning) {
      const baseTime = Date.now() - time;
      setStartTime(baseTime);
      setIsRunning(true);
      setInicio(Date.now)
      localStorage.setItem("chrono:tarefaId", tarefaId.toString())
      timerRef.current = setInterval(() => {
        setTime(Date.now() - baseTime);
      }, 1000);
    }
  };

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


  };

  const handleAddChrono = () => {

    if(!descricao)
        return toast.warn("Preencha o campo descrição")

    const agora = dayjs();

    const novoRegistro: Timesheet = {
      modo: "cronometro",
      descricao,
      tarefaId: Number(tarefaId),
      data: agora.format("YYYY-MM-DD"),
      horaInicio: startTime ? new Date(startTime).toLocaleString() : "-",
      horaFim: agora.format("HH:mm:ss"),
      horasTrabalhadas: formatTime(time),
    };


    console.log("✅ Timesheet (cronômetro): ", novoRegistro);
    handleSaveTimeSheet({...novoRegistro, descricao})
    
    setTime(0);
    setStartTime(null);

    // limpar estado
    localStorage.removeItem("chrono:startTime");
    localStorage.setItem("chrono:isRunning", "false");
    localStorage.setItem("chrono:time", "0");
    setTarefaId('')
    localStorage.removeItem("chrono:tarefaId");

    handleClearHistory()
  }

  const handleClearHistory = () => {
    setLoops([]);
    localStorage.removeItem("chrono:loops");
  };

  const handleAddManual = () => {

    if (!tarefaId || horas <= 0) return alert("Selecione uma tarefa e defina as horas!");
    const novoRegistro: Timesheet = {
      modo: "manual",
      tarefaId: Number(tarefaId),
      descricao,
      data,
      horasTrabalhadas: `${horas > 9 ? horas : '0' + horas } : 00:00`,
    };
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
            {formatTime(time)}
          </Typography>
          <Button
            variant="contained"
            disabled={!tarefaId}
            color={isRunning ? "error" : "primary"}
            startIcon={isRunning ? <Stop /> : <PlayArrow />}
            onClick={isRunning ? handleStop : handleStart}
            sx={{ minWidth: 100 }}
          >
            {isRunning && time ? "STOP" : "START"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!time && !isRunning}
            startIcon={<AddCircleOutline />}
            onClick={handleAddChrono}
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
