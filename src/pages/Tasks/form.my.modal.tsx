import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskMySchema, type TaskMyFormData } from "../../validation/taskMySchema";
import StateHandler from "../../components/common/StateHandler";
import { ColaboradorService } from "../../services/ColaboradorService";
import { TimeSheetsService } from "../../services/TimeSheetsService";
import { ClientService } from "../../services/ClientService";
import type { IClient } from "../../schema/InterfaceClient";
import type { IProcesso } from "../../schema/InterfaceProcess";
import type { IColaborador } from "../../schema/InterfaceColaboradores";
import type { ITipoTarefas } from "../../schema/InterfaceTimeSheets";
import type { ITasks } from "../../schema/InterfaceTarefa";

interface TasksAgendaFormProps {
  handleSaveOrUpdate: (data: TaskMyFormData) => void;
  handleClose: () => void;
  isClose: boolean;
  tasks?: Partial<ITasks>;
  userId: number
}

const estadoOptions = [
  { value: "0", label: "Criada" },
  { value: "1", label: "Em Progresso" },
  { value: "2", label: "Concluída" },
];

const TasksMyAgendaForm: React.FC<TasksAgendaFormProps> = ({
  tasks,
  userId,
  handleSaveOrUpdate,
  handleClose,
  isClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [clientes, setClientes] = useState<Partial<IClient>[]>([]);
  const [processos, setProcessos] = useState<Partial<IProcesso>[]>([]);
  const [colaboradores, setColaboradores] = useState<Partial<IColaborador>[]>([]);
  const [gestores, setGestores] = useState<Partial<IColaborador>[]>([]);
  const [tipoTarefas, setTipoTarefas] = useState<Partial<ITipoTarefas>[]>([]);

  /**
   * Função para converter datas no formato dd/MM/yyyy HH:mm:ss
   * para objeto Date válido
   */
  function parseDateString(dateStr?: string | null): Date | null {
    if (!dateStr) return null;
    // Detecta formato dd/MM/yyyy HH:mm:ss
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}):(\d{2}))?$/;
    const match = dateStr.match(regex);
    if (match) {
      const [, day, month, year, hours = "0", minutes = "0", seconds = "0"] = match;
      return new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
        Number(seconds)
      );
    }

    // Se vier no formato ISO ou timestamp
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  // === Configurar formulário ===
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TaskMyFormData & { horaParaRealizacao: string }>({
    resolver: zodResolver(taskMySchema),
    defaultValues: {
      descricao: "",
      estado: "Criada",
      dataParaRealizacao: "",
      horaParaRealizacao: "",
      processoId: null,
      clienteId: null,
      tipoTarefaId: null,
      tarefaId: null,
    },
  });

  const clienteSelecionado = watch("clienteId");

  // === Carregar dados iniciais ===
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [clientesRes, colaboradoresRes, gestoresRes, tiposRes] =
          await Promise.all([
            ClientService.getAll(),
            ColaboradorService.getAll(),
            ColaboradorService.getAll(),
            TimeSheetsService.getTipoTarefas(),
          ]);

        setClientes(clientesRes);
        setColaboradores(colaboradoresRes);
        setGestores(gestoresRes);
        setTipoTarefas(tiposRes);
      } catch (err: any) {
        setError("Erro ao carregar listas iniciais: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [isClose]);

  // === Recarregar processos do cliente ===
  useEffect(() => {
    const fetchProcessosByCliente = async () => {
      if (!clienteSelecionado) {
        setProcessos([]);
        return;
      }

      setLoading(true);
      try {
        const response = await ClientService.getProcessos(clienteSelecionado);
        setProcessos(response);
      } catch (err: any) {
        setError("Erro ao buscar processos do cliente: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessosByCliente();
  }, [clienteSelecionado]);

  // === Preencher dados ao editar ===
  useEffect(() => {
    if (tasks) {
      const dataHora = parseDateString(tasks.data_para_realizacao);

      const dataISO = dataHora
        ? dataHora.toISOString().split("T")[0]
        : "";
      const hora = dataHora
        ? dataHora.toTimeString().substring(0, 5)
        : "";

      reset({
        descricao: tasks.descricao ?? "",
        estado: tasks.status_id ?? "0",
        dataParaRealizacao: dataISO,
        horaParaRealizacao: hora,
        processoId: tasks.processo_id ?? null,
        clienteId: tasks.cliente_id ?? null,
        tipoTarefaId: tasks.tipo_tarefa_id ?? null,
        tarefaId: tasks.id ?? null,
      });
    }
  }, [tasks, reset]);

  const onSubmit = async (data: TaskMyFormData) => {
    try {
      setLoading(true);
      handleSaveOrUpdate(data);
      setSuccess(true);

      if (isClose) reset();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StateHandler isLoading={loading} error={error} hasData={true} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, p: 2 }}>
        <Grid container spacing={2}>
          {/* Descrição */}
          <Grid item xs={12}>
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  fullWidth
                  error={!!errors.descricao}
                  helperText={errors.descricao?.message}
                />
              )}
            />
          </Grid>

          {/* Estado */}
          <Grid item xs={12} md={6}>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Estado"
                  fullWidth
                  error={!!errors.estado}
                  helperText={errors.estado?.message}
                >
                  {estadoOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Data e Hora */}
          <Grid item xs={12} md={3}>
            <Controller
              name="dataParaRealizacao"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Data para Realização"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dataParaRealizacao}
                  helperText={errors.dataParaRealizacao?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Controller
              name="horaParaRealizacao"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="time"
                  label="Hora"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ step: 60 }}
                  error={!!errors.horaParaRealizacao}
                  helperText={errors.horaParaRealizacao?.message}
                />
              )}
            />
          </Grid>

          {/* Cliente */}
          <Grid item xs={12} md={6}>
            <Controller
              name="clienteId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Cliente"
                  fullWidth
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={!!errors.clienteId}
                  helperText={errors.clienteId?.message}
                >
                  {clientes.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.denominacao}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Processo */}
          <Grid item xs={12} md={6}>
            <Controller
              name="processoId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Processo"
                  fullWidth
                  disabled={!clienteSelecionado}
                  error={!!errors.processoId}
                  helperText={
                    clienteSelecionado
                      ? errors.processoId?.message
                      : "Selecione um cliente primeiro"
                  }
                >
                  {processos.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.ref}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Gestor 
          <Grid item xs={12} md={6}>
            <Controller
              name="gestorId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Gestor"
                  fullWidth
                  error={!!errors.gestorId}
                  helperText={errors.gestorId?.message}
                >
                  {gestores.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                      {g.nome_completo}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          */}

          {/* Colaborador 
          <Grid item xs={12} md={6}>
            <Controller
              name="colaboradorId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Colaborador"
                  fullWidth
                  error={!!errors.colaboradorId}
                  helperText={errors.colaboradorId?.message}
                >
                  {colaboradores.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.nome_completo}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          */}

          {/* Tipo de Tarefa */}
          <Grid item xs={12} md={12}>
            <Controller
              name="tipoTarefaId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  {...field}
                  label="Tipo de Tarefa"
                  fullWidth
                  error={!!errors.tipoTarefaId}
                  helperText={errors.tipoTarefaId?.message}
                >
                  {tipoTarefas.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Botões */}
           {/* === BOTÕES === */}
           <Stack width={'100%'} direction="row" justifyContent="flex-end" gap={2} mt={3}>
            <Button onClick={handleClose} color="inherit">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'A guardar...' : 'Guardar'}
            </Button>
          </Stack>
       
        </Grid>
      </Box>
    </>
  );
};

export default TasksMyAgendaForm;
