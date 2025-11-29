// src/pages/Colaborador.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../../components/common/BoxCard';
import DataTable from '../../../components/common/DataTable';
import { columnsColaborador, transformDataTasksColaborador } from '../transform';
import BoxTop from '../../../components/common/BoxTop';
import { ROUTES_PATH } from '../../../routes/routePaths';
import StateHandler from '../../../components/common/StateHandler';
import { TimeSheetsService } from '../../../services/TimeSheetsService';
import type { ITimeSheets, ITipoTarefas } from '../../../schema/InterfaceTimeSheets';
import { useUserLogged } from '../../../hooks/useUserLogged';
import BreadcrumbsNav from '../../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../../components/common/PrimaryButton';
import { Alert, Box, Button, Grid, Input, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Add, Home, Info, Settings } from '@mui/icons-material';
import SimpleModal from '../../../components/common/SimpleModal';
import VerticalTabBar from '../../../components/common/VerticalTabBar';
import HorizontalTabBar from '../../../components/common/HorizontalTabBar';
import type { IProcesso } from '../../../schema/InterfaceProcess';
import type { IClient } from '../../../schema/InterfaceClient';
import { ClientService } from '../../../services/ClientService';
import type { DespesasFormData } from '../../../validation/despesasSchema';
import { timeSheetSchema, type TimeSheetFormData } from '../../../validation/timeSheetSchema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectBox from '../../../components/common/SelectBox';
import NormalModal from '../../../components/common/NormalModal';
import type { IHonorarios } from '../../../schema/InterfaceHonorarios';
import { HonorariosService } from '../../../services/HonorariosService';
import type { ITasks, ITasksInput } from '../../../schema/InterfaceTarefa';
import TasksAgenda from '../../../components/Tasks/TasksAgenda';
import DashboardTasks from '../../../components/Tasks/Dashboard';
import { TasksService } from '../../../services/TasksService';
import TasksAgendaForm from '../form.modal';
import type { TaskFormData } from '../../../validation/taskSchema';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import { ca } from 'zod/v4/locales';
import TimesheetEntryBox from '../../../components/Chronometer/TimesheetEntryBox';

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


const MyTasks: React.FC = () => {
  const { user, saveUser, clearUser, hasAnyPermission, hasPermission } = useUserLogged();

  const navigate = useNavigate();

  const [data, setData] = React.useState<ITasks[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingModal, setIsLoadingModal] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    setTimeout(() => {
      getMyTasks();
    }, 1000)
  }, [user?.id]);

  const getMyTasks = async () => {
    try {
      const dataResponse = await TasksService.getTasksByColaboradorId(Number(user?.id), '2025-10-01', '2025-12-31');
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

  const handleExportPDF = () => {
    if (data.length > 0) {
      // timeheets(data);
    }
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  /** novo registo modal  */
  const [tipoTarefas, setTipoTarefas] = useState<ITipoTarefas[]>([]);
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Partial<ITasks>>({});
  const [isClose, setIsClose] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);


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
    } else {
      reset()
    }
    //// setOpenModalTimeSheet(isOpen)
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
      ////  setOpenModalTimeSheet(false); // Redireciona após salvar
      setTimeout(() => {
        getMyTasks();
      }, 1000)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao salvar despesa.');
    }
  };

  const handleOnChangeTask = (task: ITasks[]) => {
    console.log(task)
    
  }

  const handleNovoHonorario = () => {
    navigate(ROUTES_PATH.NewHonorarios);
  };

  const handleEdit = (task: ITasks) => {
    setForm(task);
    setOpenDialog(true);
  };

  const handleRemove = (task: ITasks) => {
    console.log("handleRemove", task)
    setForm(task);
    setOpenConfirm(true);
  };


  const handleConfirmDelete = async () => {
    try {
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

    }catch(error:any){
      toast.error(error.message || 'Erro ao eliminar tarefa.');
    }
  }

  const handleChangeStatus = async ( task: ITasks) => {
    try {
        const response = await TasksService.changeStatusTask(task.id, "2", new Date().toISOString());
        console.log("Resposta atualizada a tarefa ", response)
        if(response){
          toast.success('Tarefa atualizada com sucesso!');
          setOpenConfirm(false);
          handleCloseModal();
          setTimeout(() => {
            getMyTasks();
          }, 1000)
        }
    }catch(error:any){
      toast.error(error.message || 'Erro ao alterar o estado da tarefa.');
    }
  }

  const saveUpdateTasks =async  (data: TaskFormData) => {

    try{
      const dataToSave:ITasksInput =  {
        "processoId": data.processoId,
        "descricao": data.descricao,
        "clienteId": data.clienteId,
        "status": data.estado,
        "dataParaRealizacao": `${data.dataParaRealizacao}T${data.horaParaRealizacao}:00`,
        "colaboradorId": data.colaboradorId,
        "gestorId": data.gestorId,
        "tipoTarefaId": data.tipoTarefaId
      }   
      
      if(data.tarefaId){
        // @ts-ignore        
        const response = await TasksService.updateTask(data.tarefaId, dataToSave);
        console.log("Resposta apos salvar a tarefa ", response)
        if(response){
          toast.success('Tarefa actualizada com sucesso!');
          setIsClose(true);
          handleCloseModal();
        }
      
      }else{
        const response = await TasksService.saveTask(dataToSave);
        console.log("Resposta apos salvar a tarefa ", response)
        if(response){
          toast.success('Tarefa salva com sucesso!');
          setIsClose(true);
          handleCloseModal();
        }
      }
      
    
    }catch(error:any){
      toast.error(error.message || 'Erro ao salvar tarefa.');
    }

  }

  const handleCloseModal = () => {
    setOpenDialog(false)
  }


  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Minhas tarefas", path: "/minhas-tarefas" },
          { label: "Lista das tuas tarefas" }
        ]}
      />
      <BoxTop
        title="Lista das tarefas"
          actions={
          
          <>
            <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
              Nova tarefa
            </Button>
          </>
          
        }
      />

      <TimesheetEntryBox />

      <Grid item xs={12} md={12}>
        <BoxCard>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label="Grelha" />
            <Tab label="Agenda" />
            {/*
            <Tab label="Gráficos" />
            */}
          </Tabs>

          {/* =================== Registo =================== */}
          <TabPanel value={tabIndex} index={0}>
            <>
              <Stack mb={3} justifyContent={'space-between'} direction={'row'} bgcolor={'red'} alignContent={'center'} justifyItems={'center'} alignItems={'center'} >
                {/*
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
                */}
              </Stack>
              <StateHandler
                isLoading={isLoading}
                error={error}
                hasData={data.length > 0}
              />

              {!isLoading && !error && data.length > 0 && (
                <DataTable
                  columns={columnsColaborador}
                  rows={transformDataTasksColaborador(data, handleEdit, handleRemove, handleChangeStatus)}
                />
              )}
            </>
          </TabPanel>

          {/* =================== Agenda =================== */}
          <TabPanel value={tabIndex} index={1}>
            {tabIndex === 1 &&
              <>
                <TasksAgenda
                  tasks={data}
                  onTasksChange={handleOnChangeTask}
                />
              </>
            }
          </TabPanel>

          {/* =================== Gráficos =================== 
          <TabPanel value={tabIndex} index={2}>
            <>
              <DashboardTasks tasks={data} />
            </>
          </TabPanel>
          */}
        </BoxCard>
      </Grid>

      <SimpleModal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Formulário tarefas"
        width={800}
      >
        <TasksAgendaForm
          handleSaveOrUpdate={saveUpdateTasks}
          handleClose={handleCloseModal}
          isClose={isClose}
          tasks={form}
        />

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

export default MyTasks;
