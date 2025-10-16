// src/pages/Colaborador.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../../components/common/BoxCard';
import DataTable from '../../../components/common/DataTable';
import { columns, columnsProjectos, columnsTarefas, transformDataTimeSheet, transformDataTimeSheetProjectos, transformDataTimeSheetTarefas } from '../transform';
import BoxTop from '../../../components/common/BoxTop';
import { ROUTES_PATH } from '../../../routes/routePaths';
import StateHandler from '../../../components/common/StateHandler';
import { TimeSheetsService } from '../../../services/TimeSheetsService';
import type { ITimeSheets, ITipoTarefas, ITotalProjects, ITotalTasks } from '../../../schema/InterfaceTimeSheets';
import { useUserLogged } from '../../../hooks/useUserLogged';
import BreadcrumbsNav from '../../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { Alert, Box, Button, Grid, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Add, Home, Info, Settings } from '@mui/icons-material';
import NormalModal from '../../../components/common/NormalModal';
import VerticalTabBar from '../../../components/common/VerticalTabBar';
import HorizontalTabBar from '../../../components/common/HorizontalTabBar';
import type { IProcesso } from '../../../schema/InterfaceProcess';
import type { IClient } from '../../../schema/InterfaceClient';
import { ClientService } from '../../../services/ClientService';
import { timeSheetSchema, type TimeSheetFormData } from '../../../validation/timeSheetSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '../../../components/common/SelectBox';

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

  const [tipoTarefas, setTipoTarefas] = useState<ITipoTarefas[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);

  // Hooks
  const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<TimeSheetFormData>({
    resolver: zodResolver(timeSheetSchema),
  });

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    getTimeSheetsByColaboradorId();
    setTimeout(async () => {
      setDataTarefas(await TimeSheetsService.getAllTarefasByUserId(Number(user.id)))
      setDataProjectos(await TimeSheetsService.getAllProjectosByUserId(Number(user.id)))
    }, 2000);
  }, [user?.id]);

  const getTimeSheetsByColaboradorId = async () => {
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
        await Promise.all([fetchTipoTarefas(), fetchClientes()]);
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
  const fetchTipoTarefas = async () => setTipoTarefas(await TimeSheetsService.getTipoTarefas());
  const fetchProcessosByClientId = async (idClient: number) =>
    setProcessos(await ClientService.getProcessos(idClient));

  const onSubmit = async (formData: TimeSheetFormData) => {
    try {
      console.log("Dados a salvar: ", formData);
      toast.success('TimeSheet cadastrado com sucesso!');
      setOpenModalTimeSheet(false);
      getTimeSheetsByColaboradorId();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar TimeSheet.');
    }
  };

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
            <Tab label="Projectos" />
          </Tabs>

          <TabPanel value={tabIndex} index={0}>
            <>
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

              <StateHandler isLoading={isLoading} error={error} hasData={data.length > 0} />

              {!isLoading && !error && data.length > 0 && (
                <DataTable
                  columns={columns}
                  rows={transformDataTimeSheet(data, () => {}, () => {})}
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
                  rows={transformDataTimeSheetTarefas(dataTarefas, () => {}, () => {})}
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
                  rows={transformDataTimeSheetProjectos(dataProjectos, () => {}, () => {})}
                />
            </>
          </TabPanel>
        </BoxCard>
      </Grid>

      {/* MODAL */}
      <NormalModal open={openModalTimeSheet} onClose={() => fnModalTimeSheet(false)} title="Novo TimeSheet">
        <StateHandler isLoading={isLoadingModal} error={error} hasData />

        {!isLoadingModal && (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Cliente */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="clienteId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox
                        label="Cliente"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const selected = e.target.value;
                          field.onChange(selected);
                          fetchProcessosByClientId(Number(selected));
                        }}
                        options={clientes.map(c => ({ label: c.denominacao, value: c.id }))}
                      />
                      {errors.clienteId && <Alert severity="error">{errors.clienteId.message}</Alert>}
                    </>
                  )}
                />
              </Grid>

              {/* Processo */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="processoId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox
                        label="Processo"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        options={processos.map(p => ({ label: p.ref, value: p.id }))}
                      />
                      {errors.processoId && <Alert severity="error">{errors.processoId.message}</Alert>}
                    </>
                  )}
                />
              </Grid>

              {/* Tipo de Tarefa */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="tipoEventoId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectBox
                        label="Tipo de Tarefa"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        options={tipoTarefas.map(t => ({ label: t.descricao, value: t.id }))}
                      />
                      {errors.tipoEventoId && <Alert severity="error">{errors.tipoEventoId.message}</Alert>}
                    </>
                  )}
                />
              </Grid>

              {/* Data */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="dataInicio"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Data"
                      type="date"
                      fullWidth
                      size="small"
                      value={field.value || ""}
                      onChange={field.onChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                {errors.dataInicio && <Alert severity="error">{errors.dataInicio.message}</Alert>}
              </Grid>

              {/* Horas */}
              <Grid item xs={12} md={3}>
                <Controller
                  name="horas"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Horas/Min"
                      type="time"
                      fullWidth
                      size="small"
                      value={field.value || ""}
                      onChange={field.onChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
                {errors.horas && <Alert severity="error">{errors.horas.message}</Alert>}
              </Grid>

              {/* Botão Salvar */}
              <Grid item xs={12} md={4}>
                <PrimaryButton type="submit">Salvar</PrimaryButton>
              </Grid>
            </Grid>
          </Box>
        )}
      </NormalModal>
    </div>
  );
};

export default TimeSheetsGlobal;
