// src/pages/Colaborador.tsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transformDataColaborador } from './transform';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import type { IColaborador } from '../../schema/InterfaceColaboradores';
import { ColaboradorService } from '../../services/ColaboradorService';
import StateHandler from '../../components/common/StateHandler';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';

const Colaborador: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = React.useState<IColaborador[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() =>  {
      getAllColaboradores();
  }, 1000)
  }, []);

  const getAllColaboradores = async () => {
    try {
      const dataResponse = await ColaboradorService.getAll();
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

  const handleNovoColaborador = () => {
    navigate(ROUTES_PATH.NewColaborador);
  };

  const handleEdit = (colaborador: IColaborador) => {
    navigate(`${ROUTES_PATH.NewColaborador}/${colaborador.id}`);
  };

  const handleView = (colaborador: IColaborador) => {
    navigate(`${ROUTES_PATH.NewColaborador}/view/${colaborador.id}`);
  };

  return (
    <div>
       <BreadcrumbsNav
        items={[
          { label: "Dashboard", path: "/" },
          { label: "Configurações", path: "/settings" },
          { label: "Colaboradores" } // último sem path
        ]}
      />
      <BoxTop
        title="Lista dos Colaboradores"
        buttonText="Novo Colaborador"
        buttonProps={{ onClick: handleNovoColaborador }}
      />
      <BoxCard>
        <StateHandler
          isLoading={isLoading}
          error={error}
          hasData={data.length > 0}
        />

        {!isLoading && !error && data.length > 0 && (
          <DataTable
            columns={columns}
            rows={transformDataColaborador(data, handleEdit, handleView)}
          />
        )}
      </BoxCard>
    </div>
  );
};

export default Colaborador;
