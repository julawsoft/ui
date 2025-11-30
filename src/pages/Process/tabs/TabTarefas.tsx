/*
import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Alert,
  IconButton,
  Grid,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Add, Check, Delete } from "@mui/icons-material";
import DataTable from "../../../components/common/DataTable";
import SimpleModal from "../../../components/common/SimpleModal";
import type { ITarefa, ITarefaInput } from "../../../schema/InterfaceProcess";
import type { IColaborador } from "../../../schema/InterfaceColaboradores";
import SelectBox from "../../../components/common/SelectBox";
import { ColaboradorService } from "../../../services/ColaboradorService";
import { toast } from "react-toastify";
import { ProcessoService } from "../../../services/ProcessoService";
import { useUserLogged } from "../../../hooks/useUserLogged";
import { TasksService } from "../../../services/TasksService";
import type { ITasksInput } from "../../../schema/InterfaceTarefa";

interface Props {
  tarefas: ITarefa[];
  onDelete: (item: ITarefa) => void;
  idProcesso: number;
}

const TabTarefas: React.FC<Props> = ({ tarefas, onDelete, idProcesso }) => {
  const [open, setOpen] = useState(false);
  const [colaboradores, setColaboradores] = useState<IColaborador[]>([]);
  const [descricao, setDescricao] = useState("");
  const [responsavelId, setResponsavelId] = useState<number>();
  const [supervisorId, setSupervisorId] = useState<number>();
  const [dataPrevista, setDataPrevista] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { user } = useUserLogged();

  useEffect(() => {
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const res = await ColaboradorService.getAllColaboradoresWithoutEquipaProcesso();
      setColaboradores(res);
    } catch (error) {
      toast.error("Erro ao carregar colaboradores.");
    }
  };

  const saveTarefa = async () => {
    if (!descricao || !responsavelId || !supervisorId || !dataPrevista) {
      toast.warning("Preencha todos os campos antes de salvar.");
      return;
    }

    setSaving(true);
    try {
      const dataToSave: ITasksInput = {
        processoId: Number(idProcesso),
        descricao,
        colaboradorId: responsavelId,
        gestorId: supervisorId,
        dataParaRealizacao: dataPrevista,
      };

      await TasksService.saveTask(dataToSave);
      toast.success("Tarefa adicionada com sucesso!");
      setOpen(false);
      setDescricao("");
      setResponsavelId(undefined);
      setSupervisorId(undefined);
      setDataPrevista("");
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      toast.error("Erro ao salvar tarefa.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangeEstado = async (item: ITarefa) => {
    try {
      setLoadingId(item.id);
      const novoEstado =
        item.estado === "Concluído" ? "Pendente" : "Concluído";
      await ProcessoService.updateEstadoTarefa(item.id, novoEstado);
      toast.success(`Tarefa alterada para: ${novoEstado}`);
    } catch (error) {
      console.error("Erro ao alterar estado:", error);
      toast.error("Erro ao alterar estado da tarefa.");
    } finally {
      setLoadingId(null);
    }
  };

  const columnsTarefas = [
    { id: "id", label: "#" },
    { id: "tarefa", label: "Tarefa" },
    { id: "estado", label: "Estado" },
    { id: "responsavel", label: "Responsável" },
    { id: "gestor", label: "Supervisor" },
    { id: "dias_em_falta", label: "Dias em falta" },
    { id: "data_para_realizacao", label: "Prazo" },
    { id: "data_realizada", label: "Data realizada" },
    { id: "data_aprovada", label: "Data aprovada" },
    { id: "actions", label: "Opções" },
  ];

  const transformDataTarefa = (data: ITarefa[]): any[] =>
    data.map((item, index) => ({
      id: index + 1,
      tarefa: item.descricao,
      estado: item.estado,
      responsavel: item.nome_completo,
      gestor: item.gestor,
      dias_em_falta: (
        <Typography
          variant="body2"
          color={
            item.dias_em_falta < 0
              ? "error"
              : item.dias_em_falta > 0
              ? "success.main"
              : "textPrimary"
          }
          fontWeight={item.dias_em_falta < 0 ? 600 : 400}
        >
          {item.dias_em_falta}
        </Typography>
      ),
      data_para_realizacao: item.data_para_realizacao,
      data_realizada: item.data_realizada,
      data_aprovada: item.data_aprovada,
      actions: (
        <Stack direction="row" spacing={1}>
          {item.gestor_id === user?.id && (
            <IconButton
              color="primary"
              onClick={() => handleChangeEstado(item)}
              size="small"
              disabled={loadingId === item.id}
            >
              {loadingId === item.id ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <Check fontSize="inherit" />
              )}
            </IconButton>
          )}
          <IconButton
            color="error"
            onClick={() => onDelete(item)}
            size="small"
          >
            <Delete fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    }));

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Nova tarefa
        </Button>
      </Stack>

      {tarefas.length > 0 ? (
        <DataTable
          columns={columnsTarefas}
          rows={transformDataTarefa(tarefas)}
        />
      ) : (
        <Alert severity="info">Nenhuma tarefa encontrada.</Alert>
      )}

      <SimpleModal open={open} onClose={() => setOpen(false)} title="Nova Tarefa">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SelectBox
              label="Responsável"
              value={responsavelId ?? ""}
              fullWidth
              options={
                colaboradores?.map((c) => ({
                  value: c.id,
                  label: c.nome_completo ?? "",
                })) ?? []
              }
              onChange={(e) => setResponsavelId(Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SelectBox
              label="Supervisor"
              value={supervisorId ?? ""}
              fullWidth
              options={
                colaboradores?.map((c) => ({
                  value: c.id,
                  label: c.nome_completo ?? "",
                })) ?? []
              }
              onChange={(e) => setSupervisorId(Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Data prevista"
              type="date"
              value={dataPrevista}
              onChange={(e) => setDataPrevista(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="dense"
            />
          </Grid>

          <Grid item xs={12} mt={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={saveTarefa}
              disabled={saving}
              startIcon={
                saving ? <CircularProgress size={18} color="inherit" /> : undefined
              }
            >
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </Grid>
        </Grid>
      </SimpleModal>
    </>
  );
};

export default TabTarefas;
*/
