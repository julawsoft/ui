import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transformDataHonorarios } from './transformGlobal';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import StateHandler from '../../components/common/StateHandler';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { Box, Button, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Add, Home, Info, Settings } from '@mui/icons-material';
import VerticalTabBar from '../../components/common/VerticalTabBar';
import HorizontalTabBar from '../../components/common/HorizontalTabBar';
import type { IProcesso } from '../../schema/InterfaceProcess';
import type { IClient } from '../../schema/InterfaceClient';
import { ClientService } from '../../services/ClientService';
import type { IHonorarios } from '../../schema/InterfaceHonorarios';
import { HonorariosService } from '../../services/HonorariosService';
import FiltroHonorariosGlobal from './FiltroHonorariosGlobal';
import dayjs from 'dayjs';
import { ColaboradorService } from '../../services/ColaboradorService';
import { IColaborador } from '../../schema/InterfaceColaboradores';


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

  const navigate = useNavigate();

  const [data, setData] = React.useState<IHonorarios[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const hoje = dayjs();
  const duasSemanasAtras = hoje.subtract(2, "months");
  const amanha = hoje.add(1, "day");

  const [dataInicio, setDataInicio] = useState(
    duasSemanasAtras.format("YYYY-MM-DD")
  );

  const [dataFim, setDataFim] = useState(
    amanha.format("YYYY-MM-DD")
  );

  const [estados, setEstados] = useState<any[]>([])
  const [estado, setEstado] = useState()

  const [colaboradores, setColaboradores] = useState<IColaborador[]>([])
  const [colaborador, setColaborador] = useState<string>('')

  const [clientes, setClientes] = useState<IClient[]>([])
  const [cliente, setCliente] = useState<number>()

  const [processo, setProcesso] = useState<number>()

  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      getAllHonorarios();
      await Promise.all([fetchEstadosHonorarios(), fetchColaboradores(), fetchClientes()]);
    }, 1000)
  }, []);

  const fetchEstadosHonorarios = async () => setEstados(await HonorariosService.getEstados())
  const fetchColaboradores = async () => setColaboradores(await ColaboradorService.getAll())

  const getAllHonorarios = async () => {
    try {
      const dataResponse = await HonorariosService.getAll(
        {
          statusId: estado,
          dataInicio,
          dataFim
        }
      );
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

  const handleView = (honorario: IHonorarios) => {
    console.log("honorarios ", honorario)
    navigate(`${ROUTES_PATH.NewHonorarios}/view/${honorario.processo_factura_id}`);
  };

  const handleExportPDF = () => {
    if (data.length > 0) {
      // timeheets(data);
    }
  };

  const [tabIndex, setTabIndex] = useState(0);

  const [verticalValue, setVerticalValue] = useState("home");
  const [horizontalValue, setHorizontalValue] = useState("home");

  const tabs = [
    { label: "Home", value: "home", icon: <Home /> },
    { label: "Configurações", value: "settings", icon: <Settings /> },
    { label: "Sobre", value: "about", icon: <Info /> },
  ];


  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const [processos, setProcessos] = useState<IProcesso[]>([]);

  const fetchClientes = async () => setClientes(await ClientService.getAll());
  const fetchProcessosByClientId = async (idClient: number) => setProcessos(await ClientService.getProcessos(idClient));

   const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
      const id = e.target.value as number;
      setCliente(id);
      fetchProcessosByClientId(id);
    };


  const handleBuscar = () => {
      getAllHonorarios()
  }


  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista dos honorarios" }
        ]}
      />
      <BoxTop
        title="Lista geral dos Honorarios"
        actions={
          <Stack direction="row" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleNovoHonorario()}
            >
              Novo Registo
            </Button>
            <PrimaryButton onClick={handleExportPDF}>Exportar PDF</PrimaryButton>
          </Stack>
        }
      />

      <FiltroHonorariosGlobal
        processo={processo}
        processos={processos}
        handleChangeCliente={handleChangeCliente}
        cliente={cliente}
        clientes={clientes}
        colaboradores={colaboradores}
        colaborador={colaborador}
        dataInicio={dataInicio}
        dataFim={dataFim}
        estados={estados}
        estado={estado}
        handleChangeProcesso={(e: any) => setProcesso(e.target.value)}
        handleChangeColaborador={(e: any) => setColaborador(e.target.value)}
        handleChangeDataInicio={(e: any) => setDataInicio(e.target.value)}
        handleChangeDataFim={(e: any) => setDataFim(e.target.value)}
        handleChangeEstado={(e: any) => setEstado(e.target.value)}
        handleBuscar={handleBuscar}
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
              {
                /*          
                <Stack mb={3} justifyContent={'space-between'} direction={'row'} bgcolor={'red'} alignContent={'center'} justifyItems={'center'} alignItems={'center'} >
                  <Stack>Filtros</Stack>              
                </Stack>
                */
              }

              <StateHandler
                isLoading={isLoading}
                error={error}
                hasData={data.length > 0}
              />

              {!isLoading && !error && data.length > 0 && (
                <DataTable
                  columns={columns}
                  rows={transformDataHonorarios(data, handleView)}
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

    </div>
  );
};

export default TimeSheetsGlobal;
