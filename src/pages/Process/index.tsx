import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import BoxTop from '../../components/common/BoxTop';
import type { IProcesso } from '../../schema/InterfaceProcess';
import { processoColumns, transformDataProcesso } from '../Process/transformProcesso';
import { ProcessoService } from '../../services/ProcessoService';
import StateHandler from '../../components/common/StateHandler';
import { ROUTES_PATH } from '../../routes/routePaths';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { generateProcessosListPDF } from '../../utils/reports/generateListProcessPDF';

const Processo: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = React.useState<IProcesso[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(()=> {
      getAllProcessos();
    }, 1000)
  }, []);

  const getAllProcessos = async () => {
    try {
      const dataResponse = await ProcessoService.getAll();
      setData(dataResponse);
      setError(null);
    } catch (err: any) {
      const message = err.message || "Erro ao carregar os dados";
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
    // navigate(`${ROUTES_PATH.NewProcesso}/${processo.id}`);
  };

  const handleView = (processo: IProcesso) => {
    navigate(`${ROUTES_PATH.NewProcesso}/view/${processo.id}`);
  };

   const handleExportPDF = () => {
        if (data.length > 0) {
          generateProcessosListPDF(data);
        }
      };

  return (
    <div>
        <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Processos", path: "/processos" },
          { label: "Lista dos Processos" }
        ]}
      />
      <BoxTop
        title="Lista dos Processos"
        actions={
          <>
            <PrimaryButton onClick={handleNovoProcesso}>Novo Processo</PrimaryButton>
            <PrimaryButton onClick={handleExportPDF}>Exportar PDF</PrimaryButton>
          </>
          }
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

export default Processo;
