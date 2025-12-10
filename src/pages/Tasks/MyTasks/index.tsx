import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BoxCard from '../../../components/common/BoxCard';
import DataTable from '../../../components/common/DataTable';
import { columnsColaborador, transformDataTasksColaborador } from '../transform';
import BoxTop from '../../../components/common/BoxTop';
import StateHandler from '../../../components/common/StateHandler';
import { TimeSheetsService } from '../../../services/TimeSheetsService';
import type { ITipoTarefas } from '../../../schema/InterfaceTimeSheets';
import { useUserLogged } from '../../../hooks/useUserLogged';
import BreadcrumbsNav from '../../../components/common/BreadcrumbsNav';
import {  Box, Button, Grid, Menu, MenuItem, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Add, ExpandMore } from '@mui/icons-material';
import type { IProcesso } from '../../../schema/InterfaceProcess';
import type { IClient } from '../../../schema/InterfaceClient';
import { ClientService } from '../../../services/ClientService';
import type { ITasks, ITasksInput } from '../../../schema/InterfaceTarefa';
import TasksAgenda from '../../../components/Tasks/TasksAgenda';
import { TasksService } from '../../../services/TasksService';
import ConfirmDialog from '../../../components/common/ConfirmDialog';
import FiltroMyTask from './filtroMyTask';
import dayjs from 'dayjs';
import { estadoOptions } from '../utils';
import { generateTasksListPDF } from '../../../utils/reports/generateListTasksPDF';
import TasksMyAgendaForm from '../form.my.modal';
import SimpleModal from '../../../components/common/SimpleModal';
import type { TaskMyFormData } from '../../../validation/taskMySchema';

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
  const { user } = useUserLogged();

  const [data, setData] = React.useState<ITasks[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    setIsLoading(true);
    setTimeout(async () => {
      getMyTasks();
      await fetchClientes()
      await fetchTipoTarefas()
    }, 1000)
  }, [user?.id]);

  const getMyTasks = async () => {
    try {
      const dataResponse = await TasksService.getAll({
        colaboradorId: String(user?.id),
        dataInicio,
        dataFim,
        clienteId: String(cliente),
        processoId: processo,
        statusId: estado,
        tipoTarefa: tipoTarefa

      });
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

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  /** novo registo modal  */
  const [tipoTarefas, setTipoTarefas] = useState<ITipoTarefas[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState<Partial<ITasks>>({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isClose, setIsClose] = useState(false);

  const [clientes, setClientes] = useState<IClient[]>([]);
  const [cliente, setCliente] = useState<number>();

  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [processo, setProcesso] = useState<string>();

  const [tipoTarefa, setTipoTarefa] = useState<string>();

  const [estado, setEstado] = useState<string>("");
  const hoje = dayjs();
  const duasSemanasAfrente = hoje.add(3, "months");

  const [dataFim, setDataFim] = useState(
    duasSemanasAfrente.format("YYYY-MM-DD")
  );
  const [dataInicio, setDataInicio] = useState(hoje.format("YYYY-MM-DD"));

  const fetchClientes = async () => setTipoTarefas(await TimeSheetsService.getTipoTarefas());
  const fetchTipoTarefas = async () => setClientes(await ClientService.getAll());
  const fetchProcessosByClientId = async (idClient: number) => setProcessos(await ClientService.getProcessos(idClient));

  const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
    const id = e.target.value as number;
    setCliente(id);
    fetchProcessosByClientId(id);
  };

  const handleOnChangeTask = (task: ITasks[]) => {
    console.log(task)
  }

  const handleEdit = (task: ITasks) => {
    setForm(task);
    setOpenDialog(true);
  };

  const handleRemove = (task: ITasks) => {
    setForm(task);
    setOpenConfirm(true);
  };


  const handleConfirmDelete = async () => {
    try {
      const response = await TasksService.deleteTask(form.id!);
      console.log("Resposta apos eliminar a tarefa ", response)
      if (response) {
        toast.success('Tarefa eliminada com sucesso!');
        setOpenConfirm(false);
        handleCloseModal();
        setTimeout(() => {
          getMyTasks();
        }, 1000)
      }

    } catch (error: any) {
      toast.error(error.message || 'Erro ao eliminar tarefa.');
    }
  }

  const handleChangeStatus = async (task: ITasks) => {
    try {
      const response = await TasksService.changeStatusTask(task.id, "2", new Date().toISOString());
      console.log("Resposta atualizada a tarefa ", response)
      if (response) {
        toast.success('Tarefa atualizada com sucesso!');
        setOpenConfirm(false);
        handleCloseModal();
        setTimeout(() => {
          getMyTasks();
        }, 1000)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao alterar o estado da tarefa.');
    }
  }

  const handleCloseModal = () => {
    setOpenDialog(false)
  }

  const handleBuscar = () => {
    getMyTasks()
  }


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleExport = () => {
    if(data)
      generateTasksListPDF(data, dataInicio, dataFim)
    handleMenuClose();
  };

    const saveUpdateTasks = async (data: TaskMyFormData) => {
  
      try {
        const dataToSave: ITasksInput = {
          "processoId": data.processoId,
          "descricao": data.descricao,
          "clienteId": data.clienteId,
          "status": data.estado,
          "dataParaRealizacao": `${data.dataParaRealizacao}T${data.horaParaRealizacao}:00`,
          "colaboradorId": Number(user?.id),
          "gestorId": Number(user?.id),
          "tipoTarefaId": data.tipoTarefaId
        }
  
        if (data.tarefaId) {
          const response = await TasksService.updateTask(data.tarefaId, dataToSave);
          if (response) {
            toast.success('Tarefa actualizada com sucesso!');
            setIsClose(true);
            handleCloseModal();
            getMyTasks()
          }
  
        } else {
          const response = await TasksService.saveTask(dataToSave);
          if (response) {
            toast.success('Tarefa salva com sucesso!');
            setIsClose(true);
            handleCloseModal();
          }
        }
      } catch (error: any) {
        toast.error(error.message || 'Erro ao salvar tarefa.');
      }finally {
        getMyTasks()
      }
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

      <FiltroMyTask
        clientes={clientes}
        estados={estadoOptions}
        processos={processos}
        cliente={cliente}
        estado={estado}
        processo={processo}
        dataInicio={dataInicio}
        dataFim={dataFim}
        tipoTarefas={tipoTarefas}
        tipoTarefa={tipoTarefa}
        handleChangeCliente={handleChangeCliente}
        handleChangeTipoTarefas={(e: React.ChangeEvent<HTMLSelectElement>) => setTipoTarefa(e.target.value)}
        handleChangeProcesso={(e: React.ChangeEvent<HTMLSelectElement>) => setProcesso(e.target.value)}
        handleChangeEstado={(e: React.ChangeEvent<HTMLSelectElement>) => setEstado(e.target.value)}
        handleChangeDataInicio={(e: React.ChangeEvent<HTMLSelectElement>) => setDataInicio(e.target.value)}
        handleChangeDataFim={(e: React.ChangeEvent<HTMLSelectElement>) => setDataFim(e.target.value)}
        handleBuscar={handleBuscar}
      />


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
             
              </Stack>
              <StateHandler
                isLoading={isLoading}
                error={error}
                hasData={data.length > 0}
              />

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
                    columns={columnsColaborador}
                    rows={transformDataTasksColaborador(data, handleEdit, handleRemove, handleChangeStatus)}
                  />
                </>
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
        <TasksMyAgendaForm
          handleSaveOrUpdate={saveUpdateTasks}
          handleClose={handleCloseModal}
          isClose={isClose}
          tasks={form}
          userId={Number(user?.id)}
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
