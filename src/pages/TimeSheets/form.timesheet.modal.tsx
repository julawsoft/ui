import {
  Box,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "../../components/common/PrimaryButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import StateHandler from "../../components/common/StateHandler";
import { ClientService } from "../../services/ClientService";
import { TimeSheetsService } from "../../services/TimeSheetsService";
import { z } from "zod";
import type { IClient } from "../../schema/InterfaceClient";
import type { IProcesso } from "../../schema/InterfaceProcess";
import type { ITasks } from "../../schema/InterfaceTarefa";

const timesheetSchema = z.object({
  clienteId: z.number({ required_error: "Selecione um cliente" }),
  processoId: z.number({ required_error: "Selecione um processo" }),
  tarefaId: z.number({ required_error: "Selecione uma tarefa" }),
  data: z.string().min(1, "Informe a data"),
  horaInicio: z.string().min(1, "Informe a hora inicial"),
  horaFim: z.string().min(1, "Informe a hora final"),
  descricao: z.string().min(3, "Descreva o trabalho realizado"),
});

type TimesheetFormData = z.infer<typeof timesheetSchema>;

interface TimesheetFormProps {
  onSave: (data: TimesheetFormData) => void;
  onClose: () => void;
  isClose: boolean;
}

const TimesheetForm: React.FC<TimesheetFormProps> = ({
  onSave,
  onClose,
  isClose,
}) => {
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [tarefas, setTarefas] = useState<ITasks[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TimesheetFormData>({
    resolver: zodResolver(timesheetSchema),
    defaultValues: {
      clienteId: undefined,
      processoId: undefined,
      tarefaId: undefined,
      data: "",
      horaInicio: "",
      horaFim: "",
      descricao: "",
    },
  });

  const clienteSelecionado = watch("clienteId");
  const processoSelecionado = watch("processoId");

  /** Carregar clientes */
  useEffect(() => {
    const loadClientes = async () => {
      try {
        setLoading(true);
        const result = await ClientService.getAll();
        setClientes(result);
      } catch (err: any) {
        setError("Erro ao carregar clientes: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadClientes();
  }, []);

  /** Carregar processos quando cliente muda */
  useEffect(() => {
    const loadProcessos = async () => {
      if (!clienteSelecionado) {
        setProcessos([]);
        setTarefas([]);
        return;
      }
      try {
        setLoading(true);
        const result = await ClientService.getProcessos(clienteSelecionado);
        setProcessos(result);
      } catch (err: any) {
        setError("Erro ao carregar processos: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProcessos();
  }, [clienteSelecionado]);

  /** Carregar tarefas quando processo muda */
  useEffect(() => {
    const loadTarefas = async () => {
      if (!processoSelecionado) {
        setTarefas([]);
        return;
      }
      try {
        setLoading(true);
        const result = await TimeSheetsService.getTarefasByProcesso(processoSelecionado);
        setTarefas(result);
      } catch (err: any) {
        setError("Erro ao carregar tarefas: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTarefas();
  }, [processoSelecionado]);

  const onSubmit = (data: TimesheetFormData) => {
    onSave(data);
    if (isClose) reset();
  };

  return (
    <>
      <StateHandler isLoading={loading} error={error} hasData={true} />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 2, p: 2 }}
      >
        <Typography variant="h6" gutterBottom>
          Registar Timesheet
        </Typography>

        <Grid container spacing={2}>
          {/* Cliente */}
          <Grid item xs={12} md={6}>
            <Controller
              name="clienteId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Cliente"
                  fullWidth
                  error={!!errors.clienteId}
                  helperText={
