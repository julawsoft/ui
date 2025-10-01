// src/pages/Colaborador.tsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProcessoService } from '../../../services/ProcessoService';
import type { IProcesso } from '../../../schema/InterfaceProcess';
import { useUserLogged } from '../../../hooks/useUserLogged';
import { ROUTES_PATH } from '../../../routes/routePaths';
import BreadcrumbsNav from '../../../components/common/BreadcrumbsNav';
import BoxTop from '../../../components/common/BoxTop';
import BoxCard from '../../../components/common/BoxCard';
import StateHandler from '../../../components/common/StateHandler';
import DataTable from '../../../components/common/DataTable';
import { processoColumns, transformDataProcesso } from '../transformProcesso';
import { UserPermissions } from '../../../types/UserPermissions';

const MyProcess: React.FC = () => {
  const { user, saveUser, clearUser, hasAnyPermission, hasPermission } = useUserLogged();

  console.log("User in MyProcess: >>>> ", user?.id);

  const navigate = useNavigate();

  const [data, setData] = React.useState<IProcesso[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
  
    setIsLoading(true);
    setTimeout(() => {
      getMeusProcessos();
    }, 1000)
  }, [user?.id]); 

  const getMeusProcessos = async () => {
    try {
      const dataResponse = await ProcessoService.getByColaboradorId(Number(user?.id));
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

  const handleNovoProcesso = () => {
    // navigate(ROUTES_PATH.NewProcesso);
  };

  const handleEdit = (processo: IProcesso) => {
    navigate(`${ROUTES_PATH.NewColaborador}/${processo.id}`);
  };

  const handleView = (processo: IProcesso) => {
    navigate(`${ROUTES_PATH.NewColaborador}/${processo.id}`);
  };

  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Processos", path: "/" },
          { label: "Meus Processos", path: "/meus-processos" },
          { label: "Lista dos Teus Processos" } // último sem path
        ]}
      />

      <BoxTop
        title="Lista dos Processos"
      />
      <BoxCard>
        <StateHandler
          isLoading={isLoading}
          error={error}
          hasData={data.length > 0}
        />

        {!isLoading && !error && data.length > 0 && (
          <DataTable
            columns={processoColumns}
            rows={transformDataProcesso(data, handleEdit, handleView)}
          />
        )}
      </BoxCard>
    </div>
  );
};

export default MyProcess;
