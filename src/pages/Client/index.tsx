import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columnsDataTableClient, transforDataClient } from './transform';
import { ClientService } from '../../services/ClientService';
import { IClient } from '../../schema/InterfaceClient';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import StateHandler from '../../components/common/StateHandler';
import { useFetchData } from '../../hooks/useFetchData';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { generateClientsListPDF } from '../../utils/reports/generateListClientPDF';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { setDate } from 'date-fns';

const Client: React.FC = () => {
  const navigate = useNavigate();
  const { data: clients, isLoading, error, setData } = useFetchData<IClient>(ClientService.getAll);
  const [tipoCliente, setTipoCliente] = useState()
  const [tipoClientes, setTipoClientes] = useState([
    { label: 'Empresa', value: 1 },
    { label: 'Particular', value: 2 },
    { label: 'Ministério', value: 3 },
    { label: 'Instituto Público', value: 4 },
    { label: 'Associação', value: 5 },
    { label: 'Outro', value: 6 },
  ])


  const handleNovoCliente = () => {
    navigate(ROUTES_PATH.NewClient);
  };

  const handleEdit = (client: IClient) => {
    navigate(`${ROUTES_PATH.NewClient}/${client.id}`);
  };

  const handleView = (client: IClient) => {
    navigate(`${ROUTES_PATH.NewClient}/view/${client.id}`);
  };

  const handleExportPDF = () => {
    if (clients.length > 0) {
      generateClientsListPDF(clients);
    }
  };

  const handleChangeCliente = async (e: any) => {
    console.log("Teste", e.target.value)
    setTipoCliente(e.target.value)
  }
  const handleBuscar = async () => {
      setData(await ClientService.getAll(tipoCliente))
  }

  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Clientes", path: "/clientes" },
          { label: "Lista dos Clientes" }
        ]}
      />

      <BoxTop
        title="Lista de Clientes"
        actions={
          <>
            <PrimaryButton onClick={handleNovoCliente}>Novo Cliente</PrimaryButton>
            <PrimaryButton onClick={handleExportPDF}>Exportar PDF</PrimaryButton>
          </>
        }

      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* Cliente */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Tipo de Cliente:</Typography>
          <Select
            size="small"
            value={tipoCliente ?? ""}
            onChange={handleChangeCliente}
            sx={{ minWidth: 400 }}
          >
            <MenuItem value="">
              <em>Selecione um tipo cliente</em>
            </MenuItem>
            {tipoClientes.map((c: any) => (
              <MenuItem key={c.id} value={c.value}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Buscar */}
        <Button onClick={handleBuscar} variant="contained" color="primary">
          Buscar
        </Button>
      </Box>

      <BoxCard>
        <StateHandler
          isLoading={isLoading}
          error={error}
          hasData={clients.length > 0}
        />
        {!isLoading && !error && clients.length > 0 && (
          <DataTable
            columns={columnsDataTableClient}
            rows={transforDataClient(clients, handleEdit, handleView)}
          />
        )}
      </BoxCard>
    </div>
  );
};

export default Client;
