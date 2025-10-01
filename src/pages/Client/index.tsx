import React from 'react';
import { toast } from 'react-toastify';
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

  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Clientes", path: "/" },
          // { label: "Configurações", path: "/settings" },
          { label: "Lista dos Clientes" } // último sem path
        ]}
      />
      <BoxTop
        title="Lista de Clientes"
        buttonText="Novo Cliente"
        buttonProps={{ onClick: handleNovoCliente }}
      />
      <BoxCard>
        <StateHandler
          isLoading={isLoading}
          error={error}
          hasData={clients.length > 0}
        />

        {!isLoading && !error && clients.length > 0 && (
          <DataTable columns={columnsDataTableClient} rows={transforDataClient(clients, handleEdit, handleView)} />
        )}
      </BoxCard>
    </div>
  );
};

export default Client;
