// src/pages/Settings.tsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transforDataClient } from './transform';
import { ClientService } from '../../services/ClientService';
import { IClient } from '../../schema/InterfaceClient';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import StateHandler from '../../components/common/StateHandler';

const Client: React.FC = () => {
  const navigate = useNavigate();

  const [clients, setClients] = React.useState<IClient[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getAllClientes();
    }
    , 1000);
  }, []);

  const getAllClientes = async () => {
    try {
      const listClientes = await ClientService.getAll();
      setClients(listClientes);
      setError(null);
    } catch (err: any) {
      const message = err.message || "Erro ao carregar os clientes";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNovoCliente = () => {
    navigate(ROUTES_PATH.NewClient);
  };

  return (
    <div>
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
          <DataTable columns={columns} rows={transforDataClient(clients)} />
        )}
      </BoxCard>
    </div>
  );
};

export default Client;
