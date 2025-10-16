// src/pages/Colaborador.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transformDataHonorarios } from './transform';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import StateHandler from '../../components/common/StateHandler';
import { TimeSheetsService } from '../../services/TimeSheetsService';
import type { ITimeSheets, ITipoTarefas } from '../../schema/InterfaceTimeSheets';
import { useUserLogged } from '../../hooks/useUserLogged';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { Alert, Box, Button, Grid, Input, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Add, Home, Info, Settings } from '@mui/icons-material';
import SimpleModal from '../../components/common/SimpleModal';
import VerticalTabBar from '../../components/common/VerticalTabBar';
import HorizontalTabBar from '../../components/common/HorizontalTabBar';
import type { IProcesso } from '../../schema/InterfaceProcess';
import type { IClient } from '../../schema/InterfaceClient';
import { ClientService } from '../../services/ClientService';
import type { DespesasFormData } from '../../validation/despesasSchema';
import { timeSheetSchema, type TimeSheetFormData } from '../../validation/timeSheetSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '../../components/common/SelectBox';
import NormalModal from '../../components/common/NormalModal';
import type { IHonorarios } from '../../schema/InterfaceHonorarios';
import { HonorariosService } from '../../services/HonorariosService';


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
  const { user, saveUser, clearUser, hasAnyPermission, hasPermission } = useUserLogged();

  const navigate = useNavigate();

  const [data, setData] = React.useState<IHonorarios[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingModal, setIsLoadingModal] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    setTimeout(() => {
      getAllHonorarios();
    }, 1000)
  }, [user?.id]);

  const getAllHonorarios = async () => {
    try {
      const dataResponse = await HonorariosService.getAll();
      setData(dataResponse);
      setError(null);
    } catch (err: any) {
      const message = err.message || "Erro ao carregar os honorarios";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNovoHonorario = () => {
    navigate(ROUTES_PATH.NewHonorarios);
  };

  const handleEdit = (honorario: IHonorarios) => {
    navigate(`${ROUTES_PATH.NewHonorarios}/${honorario.processo_factura_item_id}`);
  };

  const handleView = (honorario: IHonorarios) => {
    navigate(`${ROUTES_PATH.NewHonorarios}/view/${honorario.processo_factura_item_id}`);
  };

  const handleExportPDF = () => {
    if (data.length > 0) {
      // timeheets(data);
    }
  };

  const [tabIndex, setTabIndex] = useState(0);

  const [verticalValue, setVerticalValue] = useState("home");
  const [horizontalValue, setHorizontalValue] = useState("home");
  const [openModalTimeSheet, setOpenModalTimeSheet] = useState(false);

  const tabs = [
    { label: "Home", value: "home", icon: <Home /> },
    { label: "Configurações", value: "settings", icon: <Settings /> },
    { label: "Sobre", value: "about", icon: <Info /> },
  ];


  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  /** novo registo modal  */
  const [tipoTarefas, setTipoTarefas] = useState<ITipoTarefas[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);


  const fnModalHonorario = async (isOpen: boolean) => {
    if (isOpen) {
      try {
        setIsLoadingModal(true);
        await Promise.all([fetchTipoTarefas(), fetchClientes()]);
        setIsLoadingModal(false);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        toast.error('Erro ao carregar dados iniciais.');
        setIsLoadingModal(false)
      } finally {
        setIsLoadingModal(false);
      }
      console.log("Carregar os dados...")
    }else{
      reset()
    }
    setOpenModalTimeSheet(isOpen)
  }

  const fetchClientes = async () => setTipoTarefas(await TimeSheetsService.getTipoTarefas());
  const fetchTipoTarefas = async () => setClientes(await ClientService.getAll());
  const fetchProcessosByClientId = async (idClient: number) => setProcessos(await ClientService.getProcessos(idClient));

  // React Hook Form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<TimeSheetFormData>({
    resolver: zodResolver(timeSheetSchema),
  });


  const onSubmit = async (data: TimeSheetFormData) => {
    try {

      console.log("dados a salvar ... ", data)

      /*
      const dataDTO: any = {
     tipoEventoId: z.number().int().positive("O despesa deve ser um número positivo"),
       processoId: z.number(),
       clienteId: z.number(),
       descricao: z.string(),
       dadosImportantes: z.string(),
       dataInicio: z.string(),
       dataFim: z.string(),
       horas: z.string(),
      }
      await TimeSheetsService.save(dataDTO);
      */
      toast.success('TimeSheet cadastrado com sucesso!');
      setOpenModalTimeSheet(false); // Redireciona após salvar
      setTimeout(() => {
        getAllHonorarios();
      }, 1000)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar despesa.');
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
      <BoxTop
        title="Lista dos TimeSheets"
      />
      <Grid item xs={12} md={12}>
        <BoxCard>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Registos" />
            {/*} <Tab label="Relatórios" /> */}
          </Tabs>

          {/* =================== Registo =================== */}
          <TabPanel value={tabIndex} index={0}>
            <>
              <Stack mb={3} justifyContent={'space-between'} direction={'row'} bgcolor={'red'} alignContent={'center'} justifyItems={'center'} alignItems={'center'} >
                <Stack>Filtros</Stack>
                <Stack direction="row" justifyContent="flex-end" gap={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => fnModalHonorario(true)}
                  >
                    Novo Registo
                  </Button>
                  <PrimaryButton onClick={handleExportPDF}>Exportar PDF</PrimaryButton>
                </Stack>
              </Stack>

              <StateHandler
                isLoading={isLoading}
                error={error}
                hasData={data.length > 0}
              />

              {!isLoading && !error && data.length > 0 && (
                <DataTable
                  columns={columns}
                  rows={transformDataHonorarios(data, handleEdit, handleView)}
                />
              )}
            </>
          </TabPanel>

          {/* =================== Relatorios =================== */}
          <TabPanel value={tabIndex} index={1}>
            <>

              <Box sx={{ display: "flex", gap: 4, p: 3 }}>
                {/* Vertical Tabs */}
                <Box sx={{ width: 250 }}>
                  <VerticalTabBar
                    tabs={tabs}
                    value={verticalValue}
                    onChange={setVerticalValue}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      Conteúdo da aba: {verticalValue}
                    </Typography>
                  </Box>
                </Box>

                {/* Horizontal Tabs */}
                <Box sx={{ flexGrow: 1 }}>
                  <HorizontalTabBar
                    tabs={tabs}
                    value={horizontalValue}
                    onChange={setHorizontalValue}
                    centered
                  />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1">
                      Conteúdo da aba: {horizontalValue}
                    </Typography>
                  </Box>
                </Box>
              </Box>

            </>
          </TabPanel>

        </BoxCard>
      </Grid>


      {/* ========== MODAIS ========== */}
      <NormalModal open={openModalTimeSheet} onClose={() => fnModalHonorario(false)} title="Novo TimeSheet">
          <StateHandler
            isLoading={isLoadingModal}
            error={error}
            hasData={data.length > 0}
          />

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
                          {...field}
                          onChange={(selectedValue) => {
                            console.log("selectedValue ", selectedValue)
                            field.onChange(selectedValue);        // Atualiza o RHF
                            fetchProcessosByClientId(selectedValue.target.value); // Busca processos do cliente
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
                          {...field}
                          options={processos.map(p => ({ label: p.ref, value: p.id }))}
                        />
                        {errors.processoId && <Alert severity="error">{errors.processoId.message}</Alert>}
                      </>
                    )}
                  />
                </Grid>

                {/* Tipo de Despesa */}
                <Grid item xs={12} md={6}>
                  <Controller
                    name="tipoEventoId"
                    control={control}
                    render={({ field }) => (
                      <>
                        <SelectBox
                          label="Tipo de Tarefa"
                          {...field}
                          options={tipoTarefas.map(d => ({ label: d.descricao, value: d.id }))}
                        />
                        {errors.tipoEventoId && <Alert severity="error">{errors.tipoEventoId.message}</Alert>}
                      </>
                    )}
                  />
                </Grid>

                {/* Valor */}
                <Grid item xs={12} md={3}>
                  <Controller
                    name="dataInicio"
                    control={control}
                    render={({ field }) => <Input label="Data" type="date" {...field} />}
                  />
                  {errors.dataInicio && <Alert severity="error">{errors.dataInicio.message}</Alert>}
                </Grid>

                {/* Valor */}
                <Grid item xs={12} md={3}>
                  <Controller
                    name="horas"
                    control={control}
                    render={({ field }) => <Input label="Horas/Min" type="time" {...field} />}
                  />
                  {errors.horas && <Alert severity="error">{errors.horas.message}</Alert>}
                </Grid>

                {/* Botão de salvar */}
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
