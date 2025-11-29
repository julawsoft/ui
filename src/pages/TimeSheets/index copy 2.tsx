// src/pages/Colaborador.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, columnsProjectos, columnsTarefas, transformDataTimeSheet, transformDataTimeSheetProjectos, transformDataTimeSheetTarefas } from './transformGlobal';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import StateHandler from '../../components/common/StateHandler';
import { TimeSheetsService } from '../../services/TimeSheetsService';
import type { ITimeSheets, ITimeSheetsForm, ITipoTarefas, ITotalProjects, ITotalTasks } from '../../schema/InterfaceTimeSheets';
import { useUserLogged } from '../../hooks/useUserLogged';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { Alert, Box, Button, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Add, Home, Info, Settings } from '@mui/icons-material';
import NormalModal from '../../components/common/NormalModal';
import VerticalTabBar from '../../components/common/VerticalTabBar';
import HorizontalTabBar from '../../components/common/HorizontalTabBar';
import type { IProcesso } from '../../schema/InterfaceProcess';
import type { IClient } from '../../schema/InterfaceClient';
import { ClientService } from '../../services/ClientService';
import { timeSheetSchema, type TimeSheetFormData } from '../../validation/timeSheetSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '../../components/common/SelectBox';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import SimpleModal from '../../components/common/SimpleModal';
import type { ITasks } from '../../schema/InterfaceTarefa';
import { TasksService } from '../../services/TasksService';
import { formatDateInput } from '../../utils/data';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);

const TimeSheetsGlobal: React.FC = () => {
  const { user } = useUserLogged();
  const navigate = useNavigate();

  const [data, setData] = useState<ITimeSheets[]>([]);
  const [dataTarefas, setDataTarefas] = useState<ITotalTasks[]>([]);
  const [dataProjectos, setDataProjectos] = useState<ITotalProjects[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [verticalValue, setVerticalValue] = useState("home");
  const [horizontalValue, setHorizontalValue] = useState("home");
  const [openModalTimeSheet, setOpenModalTimeSheet] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [tarefas, setTarefas] = useState<ITasks[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
 const [form, setForm] = useState<Partial<ITimeSheetsForm>>({});
  // Hooks
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<TimeSheetFormData>({
    resolver: zodResolver(timeSheetSchema),
  });

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    getAllTimeSheets();
    setTimeout(async () => {  
      setDataTarefas(await TimeSheetsService.getAllTarefas())
      setDataProjectos(await TimeSheetsService.getAllProjectos())
    }, 2000);

    if (form?.id) {
      reset({
        clienteId: form.clienteId,
        processoId: form.processoId,
        tarefaId: form.tarefaId,
        descricao: form.descricao || "",
        dataInicio: form.dataInicio
          ? new Date(form.dataInicio).toISOString().split("T")[0]
          : "",
        horas: form.horas || "",
        timeSheetId: form.id,
      });
    }
  }, [user?.id, form]);
  

  const getAllTimeSheets = async () => {
    try {
      const dataResponse = await TimeSheetsService.getAll();
      setData(dataResponse);
      setError(null);
    } catch (err: any) {
      const message = err.message || "Erro ao carregar os colaboradores";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const fnModalTimeSheet = async (isOpen: boolean) => {
    if (isOpen) {
      try {
        setIsLoadingModal(true);
        await Promise.all([fetchClientes()]);
      } catch (error) {
        toast.error('Erro ao carregar dados iniciais.');
      } finally {
        setIsLoadingModal(false);
      }
    } else {
      reset();
    }
    setOpenModalTimeSheet(isOpen);
  };

  const fetchClientes = async () => setClientes(await ClientService.getAll());
  const fetchTarefas = async (idProcesso: number) => setTarefas(await TasksService.getTasksByProcesso(idProcesso));
  const fetchProcessosByClientId = async (idClient: number) =>
    setProcessos(await ClientService.getProcessos(idClient));

  const onSubmit = async (formData: TimeSheetFormData) => {

    try {

    const dataToSave: {
      colaboradorId: number;
      clienteId: number;
      processoId: number;
      descricao: string;
      dataInicio: string;
      dataFim: string;
      horas: string;
      tarefaId: number;
      timeSheetId?: number;
    } = {
      colaboradorId: Number(user?.id),
      clienteId: formData.clienteId,
      processoId: formData.processoId,
      descricao: formData.descricao,
      dataInicio: formData.dataInicio,
      dataFim: formData.dataInicio,
      horas: formData.horas,
      tarefaId: formData.tarefaId,
    };

      if(formData.timeSheetId){ 
        const response = await TimeSheetsService.update(formData.timeSheetId, dataToSave)
        if(response)
          toast.success('TimeSheet atualizado com sucesso!');
      }else{
        const response = await TimeSheetsService.save(dataToSave)
        if(response)
        toast.success('TimeSheet cadastrado com sucesso!');
      }
      
      setOpenModalTimeSheet(false);
      getAllTimeSheets();

    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar TimeSheet.');
    }
  };

// === Editar um registro existente ===
const handleEdit = async (timeSheet: ITimeSheets) => {
  try {
    setIsLoadingModal(true);
    setForm(timeSheet);

    console.log("timeSheet >>> ", timeSheet)

    // 1️⃣ Abre o modal
    setOpenModalTimeSheet(true);

    // 2️⃣ Carrega clientes, processos e tarefas relacionados
    await fetchClientes();
    await fetchProcessosByClientId(timeSheet.clienteId);
    await fetchTarefas(timeSheet.processoId);

    // 3️⃣ Envia os valores para o formulário do react-hook-form
    reset({
      clienteId: timeSheet.clienteId,
      processoId: timeSheet.processoId,
      tarefaId: timeSheet.tarefaId,
      descricao: timeSheet.descricao || "",
      dataInicio: formatDateInput(timeSheet.data_inicio),
      horas: timeSheet.horas || "",
      timeSheetId: timeSheet.id,
    });
  } catch (err) {
    console.error("Erro ao carregar dados para edição:", err);
    toast.error("Erro ao carregar dados do TimeSheet.");
  } finally {
    setIsLoadingModal(false);
  }
};

  const handleView = (timeSheet: ITimeSheets) => {
    // setForm(task);
    console.log("handleRemove", timeSheet)
    // setOpenDialog(true);
  };

  const handleRemove = (timeSheet: ITimeSheets) => {
    console.log("handleRemove", timeSheet)
    // setForm(task);
    setOpenConfirm(true);
  };


  const handleConfirmDelete = async () => {
    try {
      /* 
      const response = await TasksService.deleteTask(form.id!);
        console.log("Resposta apos eliminar a tarefa ", response)
        if(response){
          toast.success('Tarefa eliminada com sucesso!');
          setOpenConfirm(false);
          handleCloseModal();
          setTimeout(() => {
            getMyTasks();
          }, 1000)
        }
      */

    } catch (error: any) {
      toast.error(error.message || 'Erro ao eliminar tarefa.');
    }
  }

  const handleChangeStatus = async (timeSheets: ITimeSheets) => {
    try {
      
        const response = await TimeSheetsService.submeter(timeSheets.id, 'aprovado');
        console.log("Resposta atualizada a tarefa ", response)
        if(response){
          toast.success('TimeSheet submetido com sucesso!');
          setOpenConfirm(false);
          handleCloseModal();
          setTimeout(() => {
            getAllTimeSheets()
          }, 1000)
        }
        
    } catch (error: any) {
      toast.error(error.message || 'Erro ao alterar o estado da tarefa.');
    }
  }

  const handleCloseModal = () => {
    fnModalTimeSheet(false), 
    reset()
  }
  const handleOpenModal = () => {
    fnModalTimeSheet(true), 
    reset()
  }

  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Meus TimeSheets", path: "/meus-timesheets" },
          { label: "Lista dos teus timesheets" }
        ]}
      />
      <BoxTop title="Lista dos TimeSheets" />
      <Grid item xs={12}>
        <BoxCard>
          <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} variant="scrollable">
            <Tab label="Registos" />
            <Tab label="Tarefas" />
            <Tab label="Processos" />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <>

              {/*
              <Stack mb={3} direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Filtros</Typography>
              </Stack>
               */}

              <StateHandler isLoading={isLoading} error={error} hasData={data.length > 0} />

              {!isLoading && !error && data.length > 0 && (
                <DataTable
                  columns={columns}
                  rows={transformDataTimeSheet(data, handleEdit, handleRemove, handleView, handleChangeStatus)}
                />
              )}
            </>
          </TabPanel>

          {/*  TAREFAS  */}
          <TabPanel value={tabIndex} index={1}>
            <>
              {/*
              <Stack mb={3} direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Filtros</Typography>
                <Stack direction="row" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => fnModalTimeSheet(true)}
                  >
                    Novo Registo
                  </Button>
                  <PrimaryButton onClick={() => toast.info("Exportar PDF")}>Exportar PDF</PrimaryButton>
                </Stack>
              </Stack>

              */}
              <DataTable
                columns={columnsTarefas}
                rows={transformDataTimeSheetTarefas(dataTarefas, () => { }, () => { })}
              />
            </>
          </TabPanel>

          {/*  PROJECTOS  */}
          <TabPanel value={tabIndex} index={2}>
            <>
              {/*
              <Stack mb={3} direction="row" justifyContent="space-between" alignItems="center">
                <Typography>Filtros</Typography>
                <Stack direction="row" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => fnModalTimeSheet(true)}
                  >
                    Novo Registo
                  </Button>
                  <PrimaryButton onClick={() => toast.info("Exportar PDF")}>Exportar PDF</PrimaryButton>
                </Stack>
              </Stack>

              */}
              <DataTable
                columns={columnsProjectos}
                rows={transformDataTimeSheetProjectos(dataProjectos, () => { }, () => { })}
              />
            </>
          </TabPanel>
        </BoxCard>
      </Grid>




      {/* === MODAL DE TIMESHEET === */}
      <SimpleModal
        open={openModalTimeSheet}
        onClose={() => {
          fnModalTimeSheet(false);
          reset();
        }}
        title="Registar TimeSheet"
        width={800}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* === CLIENTE === */}
            <Grid item xs={12}>
              <Controller
                name="clienteId"
                control={control}
                render={({ field }) => (
                  <SelectBox
                    {...field}
                    label="Cliente"
                    options={clientes.map(c => ({ label: c.denominacao, value: c.id }))}
                    placeholder="Selecione um cliente"
                    onChange={(e) => {
                      const idClient = Number(e.target.value);
                      field.onChange(idClient);
                      fetchProcessosByClientId(idClient);
                    }}
                    error={!!errors.clienteId}
                    helperText={errors.clienteId?.message}
                  />
                )}
              />
            </Grid>

            {/* === PROCESSO === */}
            <Grid item xs={12}>
              <Controller
                name="processoId"
                control={control}
                render={({ field }) => (
                  <SelectBox
                    {...field}
                    label="Processo"
                    options={processos.map(p => ({ label: p.ref, value: p.id }))}
                    placeholder="Selecione um processo"
                    error={!!errors.processoId}
                    helperText={errors.processoId?.message}
                    onChange={(e) => {
                      const idProcesso = Number(e.target.value);
                      field.onChange(idProcesso);
                      fetchTarefas(idProcesso);
                    }}
                  />
                )}
              />
            </Grid>

            {/* === TIPO DE TAREFA === */}
            <Grid item xs={12}>
              <Controller
                name="tarefaId"
                control={control}
                render={({ field }) => (
                  <SelectBox
                    {...field}
                    label="Tipo de Tarefa"
                    options={tarefas.map(t => ({ label: t.descricao, value: t.id }))}
                    placeholder="Selecione o tipo de tarefa"
                    error={!!errors.tarefaId}
                    helperText={errors.tarefaId?.message}
                  />
                )}
              />
            </Grid>

            {/* === DESCRIÇÃO === */}
            <Grid item xs={12}>
              <Controller
                name="descricao"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Descrição da Atividade"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                )}
              />
            </Grid>

            {/* === DATA INÍCIO === */}
            <Grid item xs={6}>
              <Controller
                name="dataInicio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Data"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dataInicio}
                    helperText={errors.dataInicio?.message}
                    value={field.value || ""}
                  />
                )}
              />
            </Grid>

            {/* === DATA FIM === */}
            <Grid item xs={6}>
              <Controller
                name="horas"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="time"
                    label="Hora(s)"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.horas}
                    helperText={errors.horas?.message}
                    value={field.value || ""}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* === BOTÕES === */}
          <Stack direction="row" justifyContent="flex-end" gap={2} mt={3}>
            <Button onClick={handleCloseModal} color="inherit">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={isLoadingModal}>
              {isLoadingModal ? 'A guardar...' : 'Guardar'}
            </Button>
          </Stack>
        </form>
      </SimpleModal>

      <ConfirmDialog
        open={openConfirm}
        title="Confirmar eliminação"
        message="Tem certeza que deseja eliminar este registo?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />


    </div>
  );
};

export default TimeSheetsGlobal;
