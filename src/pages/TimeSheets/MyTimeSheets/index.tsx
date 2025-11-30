import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BoxCard from '../../../components/common/BoxCard';
import DataTable from '../../../components/common/DataTable';
import { columns, columnsProjectos, columnsTarefas, transformDataTimeSheet, transformDataTimeSheetProjectos, transformDataTimeSheetTarefas } from '../transform';
import StateHandler from '../../../components/common/StateHandler';
import { TimeSheetsService } from '../../../services/TimeSheetsService';
import type { ITimeSheets, ITimeSheetsForm, ITotalProjects, ITotalTasks } from '../../../schema/InterfaceTimeSheets';
import { useUserLogged } from '../../../hooks/useUserLogged';
import BreadcrumbsNav from '../../../components/common/BreadcrumbsNav';
import { Box, Button, Grid, Menu, MenuItem, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import type { IProcesso } from '../../../schema/InterfaceProcess';
import type { IClient } from '../../../schema/InterfaceClient';
import { ClientService } from '../../../services/ClientService';
import { timeSheetSchema, type TimeSheetFormData } from '../../../validation/timeSheetSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '../../../components/common/SelectBox';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import SimpleModal from '../../../components/common/SimpleModal';
import type { ITasks } from '../../../schema/InterfaceTarefa';
import { TasksService } from '../../../services/TasksService';
import { formatDateInput } from '../../../utils/data';
import TimesheetEntryBox from '../../../components/Chronometer/TimesheetEntryBox';
import FiltroTimeSheets from './FiltroTimeSheets';
import { ProcessoService } from '../../../services/ProcessoService';
import dayjs from 'dayjs';
import { generateTimeSheetListAVDPDF } from '../../../utils/reports/generateListTimeSheetADVPDF';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const estados = [
  {
    id: "rascunho",
    nome: "Rascunho"
  },
  {
    id: "submetido",
    nome: "Submetido"
  },
  {
    id: "aprovado",
    nome: "Aprovado"
  },
  {
    id: "rejeitado",
    nome: "Rejeitado"
  },
  {
    id: "faturado",
    nome: "Faturado"
  },
]


const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);

const MineTimeSheets: React.FC = () => {
  const { user } = useUserLogged();

  const [data, setData] = useState<ITimeSheets[]>([]);
  const [dataTarefas, setDataTarefas] = useState<ITotalTasks[]>([]);
  const [dataProjectos, setDataProjectos] = useState<ITotalProjects[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tabIndex, setTabIndex] = useState(0);
  const [openModalTimeSheet, setOpenModalTimeSheet] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [tarefas, setTarefas] = useState<ITasks[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [form, setForm] = useState<Partial<ITimeSheetsForm>>({});

  const [cliente, setCliente] = useState<number>();
  const [processo, setProcesso] = useState<number>();

  const [tarefa, setTarefa] = useState<number>();
  const [estado, setEstado] = useState("");

  const hoje = dayjs();
  const duasSemanasAtras = hoje.subtract(2, "months");
  const amanha = hoje.add(1, "day");

  const [dataInicio, setDataInicio] = useState(
    duasSemanasAtras.format("YYYY-MM-DD")
  );

  const [dataFim, setDataFim] = useState(
    amanha.format("YYYY-MM-DD")
  );

  const { control, handleSubmit, formState: { errors }, reset } = useForm<TimeSheetFormData>({
    resolver: zodResolver(timeSheetSchema),
  });

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    getTimeSheetsByColaboradorId();
    setTimeout(async () => {
      setDataTarefas(await TimeSheetsService.getAllTarefasByUserId(Number(user.id)))
      setDataProjectos(await TimeSheetsService.getAllProjectosByUserId(Number(user.id)))

      setClientes(await ClientService.getAll())
      setProcessos(await ProcessoService.getAll())
      // tarefas do colaborador logado
      setTarefas(await TasksService.getAll({
        colaboradorId: String(user.id)      
      }))

    }, 1000);

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


  const getTimeSheetsByColaboradorId = async () => {
    try {
      const dataResponse = await TimeSheetsService.getAll({
        clienteId: cliente,
        processoId: processo,
        colaboradorId: user?.id,
        dataInicio: dataInicio,
        tarefaId: tarefa,
        dataFim: dataFim,
        statusId: estado
      });
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

      if (formData.timeSheetId) {
        const response = await TimeSheetsService.update(formData.timeSheetId, dataToSave)
        if (response)
          toast.success('TimeSheet atualizado com sucesso!');
      } else {
        const response = await TimeSheetsService.save(dataToSave)
        if (response)
          toast.success('TimeSheet cadastrado com sucesso!');
      }

      setOpenModalTimeSheet(false);
      getTimeSheetsByColaboradorId();

    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar TimeSheet.');
    }
  };

  const handleEdit = async (timeSheet: ITimeSheets) => {
    try {
      setIsLoadingModal(true);
      setForm(timeSheet);

      setOpenModalTimeSheet(true);

      await fetchClientes();
      await fetchProcessosByClientId(timeSheet.clienteId);
      await fetchTarefas(timeSheet.processoId);

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
      toast.error("Erro ao carregar dados do TimeSheet.");
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleView = (timeSheet: ITimeSheets) => {
    console.log("handleRemove", timeSheet)
  };

  const handleRemove = (timeSheet: ITimeSheets) => {
    console.log("handleRemove", timeSheet)
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

  const handleCloseModal = () => {
    fnModalTimeSheet(false),
      reset()
  }

  const handleBuscar = () => {
    console.log("Buscar com filtros:", estado)
    getTimeSheetsByColaboradorId()
  }

  const totalDuration = (): string => {
    const totalSeconds = data.reduce((acc:any, t:any) => {
      if (!t.horas) return acc;

      const parts = t.horas.split(":").map(Number);
      const [h = 0, m = 0, s = 0] = parts;

      if (isNaN(h) || isNaN(m) || isNaN(s)) return acc; // ignora valores inválidos

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleExport = () => {
    if(data)
      generateTimeSheetListAVDPDF(data, dataInicio, dataFim)
    handleMenuClose();
  };

  const handleSaveTimeSheet = async (data: any) => {

      const dataToSave = {
        colaboradorId: Number(user?.id),
        descricao: data.descricao,
        dataInicio: data.data,
        dataFim: data.data,
        horas: data.horasTrabalhadas,
        tarefaId: data.tarefaId
      }
      
      const response = await TimeSheetsService.save(dataToSave)
      if (response) {
        toast.success('TimeSheet cadastrado com sucesso!');
        getTimeSheetsByColaboradorId()
      }
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

      {/*
      <BoxTop title="Lista meus dos TimeSheets" actions={
          <Stack direction="row" gap={1}>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Novo Registo
          </Button>
          
          <PrimaryButton onClick={() => toast.info("Exportar PDF")}>Exportar PDF</PrimaryButton>
        </Stack>
      }/>

      */}


      <TimesheetEntryBox
           tarefas={tarefas}
           handleSaveTimeSheet={handleSaveTimeSheet}
      />

      {/*
        <TimesheetTable />
        */}

      <FiltroTimeSheets
        clientes={clientes}
        processos={processos}
        tarefas={tarefas}
        estados={estados}
        cliente={cliente}
        processo={processo}
        tarefa={tarefa}
        estado={estado}
        dataInicio={dataInicio}
        dataFim={dataFim}
        handleChangeCliente={(e: any) => setCliente(e.target.value)}
        handleChangeProcesso={(e: any) => setProcesso(e.target.value)}
        handleChangeTarefa={(e: any) => setTarefa(e.target.value)}
        handleChangeEstado={(e: any) => setEstado(e.target.value)}
        handleChangeDataInicio={(e: any) => setDataInicio(e.target.value)}
        handleChangeDataFim={(e: any) => setDataFim(e.target.value)}
        handleBuscar={handleBuscar}
      />


      <Grid item xs={12}>
        <BoxCard>
          <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} variant="scrollable">
            <Tab label="Registos" />
            {/*<Tab label="Tarefas" /> */}
            <Tab label="Processos" />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <>
              <Stack mb={3} direction="row" justifyContent="space-between" alignItems="center">
                {/* 
                <Typography>Filtros</Typography>
                <Stack direction="row" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenModal}
                  >
                    Novo Registo
                  </Button>
                  <PrimaryButton onClick={() => toast.info("Exportar PDF")}>Exportar PDF</PrimaryButton>
                </Stack>
                */}
              </Stack>

              <StateHandler isLoading={isLoading} error={error} hasData={data.length > 0} />

              {!isLoading && !error && data.length > 0 && (
                <>
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
                      <strong>Total horas:</strong> {totalDuration()} &nbsp; | &nbsp;
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
                        <MenuItem onClick={() => handleExport()}>PDF</MenuItem>
                        <MenuItem onClick={() => handleExport()}>Excel</MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                  <DataTable
                    columns={columns}
                    rows={transformDataTimeSheet(data, handleEdit, handleRemove, handleView)}
                  />
                </>
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
                rows={transformDataTimeSheetTarefas(dataTarefas)}
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
                rows={transformDataTimeSheetProjectos(dataProjectos)}
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
                    onChange={(e) => {
                      const idClient = Number(e.target.value);
                      field.onChange(idClient);
                      fetchProcessosByClientId(idClient);
                    }}
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

export default MineTimeSheets;
