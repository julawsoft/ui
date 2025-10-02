import React from 'react';
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

const Client: React.FC = () => {
  const navigate = useNavigate();
  const { data: clients, isLoading, error } = useFetchData<IClient>(ClientService.getAll);

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
