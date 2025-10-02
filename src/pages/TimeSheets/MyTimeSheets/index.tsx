// src/pages/Colaborador.tsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../../components/common/BoxCard';
import DataTable from '../../../components/common/DataTable';
import { columns, transformDataColaborador } from '../transform';
import BoxTop from '../../../components/common/BoxTop';
import { ROUTES_PATH } from '../../../routes/routePaths';
import type { IColaborador } from '../../../schema/InterfaceColaboradores';
import { ColaboradorService } from '../../../services/ColaboradorService';
import StateHandler from '../../../components/common/StateHandler';
import { TimeSheetsService } from '../../../services/TimeSheetsService';
import type { IProcesso } from '../../../schema/InterfaceProcess';
import { useUserLogged } from '../../../hooks/useUserLogged';
import BreadcrumbsNav from '../../../components/common/BreadcrumbsNav';

const MyTimeSheets: React.FC = () => {
  const { user, saveUser, clearUser, hasAnyPermission, hasPermission } = useUserLogged();

  const navigate = useNavigate();

  const [data, setData] = React.useState<IProcesso[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    setTimeout(() => {
      getTImeSheetsByColaboradorId();
    }, 1000)
  }, [user?.id]);

  const getTImeSheetsByColaboradorId = async () => {
    try {
      const dataResponse = await TimeSheetsService.getByColaboradorId(Number(user?.id));
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
          { label: "Início", path: "/" },
          { label: "Meus TimeSheets", path: "/meus-timesheets" },
          { label: "Lista dos teus timesheets" }
        ]}
      />
      <BoxTop
        title="Lista dos TimeSheets"
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

export default MyTimeSheets;
