// src/pages/Colaborador.tsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transformDataColaborador, transformDataDespesas } from './transform';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import type { IColaborador } from '../../schema/InterfaceColaboradores';
import { ColaboradorService } from '../../services/ColaboradorService';
import StateHandler from '../../components/common/StateHandler';
import { DespesasService } from '../../services/DespesasService';
import type { IDespesas, ITipoDespesas } from '../../schema/interfaceDespesas';
import { useFetchData } from '../../hooks/useFetchData';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { generateDespesasListPDF } from '../../utils/reports/generateListDespesasPDF';

const Despesas: React.FC = () => {
  const navigate = useNavigate();
  const { 
    data, 
    isLoading, 
    error,
    setIsLoading,
   } = useFetchData<IDespesas>(DespesasService.getAll);
  
  useEffect(() => {
    setIsLoading(true);
  }, []);

  const handleNovaDespesa = () => {
    navigate(ROUTES_PATH.NewDespesas);
  };

  const handleEdit = (despesas: IDespesas) => {
    navigate(`${ROUTES_PATH.NewDespesas}/${despesas.id}`);
  };

    const handleExportPDF = () => {
        if (data.length > 0) {
          generateDespesasListPDF(data);
        }
      };

  return (
    <div>
       <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Despesas", path: ROUTES_PATH.Despesas },
          { label: "Lista das Despesas" } // último sem path
        ]}
      />
      <BoxTop
        title="Lista das Despesas"
        actions={
          <>
            <PrimaryButton onClick={handleNovaDespesa}>Nova Despesa</PrimaryButton>
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
            columns={columns}
            rows={transformDataDespesas(data, handleEdit)}
          />
        )}
      </BoxCard>
    </div>
  );
};

export default Despesas;
