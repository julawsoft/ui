import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import BoxTop from '../../components/common/BoxTop';
import type { IProcesso, IProcessoInstituicoes, IProcessoModoFacturacao, IProcessoStatus } from '../../schema/InterfaceProcess';
import { processoColumns, transformDataProcesso } from '../Process/transformProcesso';
import { ProcessoService } from '../../services/ProcessoService';
import StateHandler from '../../components/common/StateHandler';
import { ROUTES_PATH } from '../../routes/routePaths';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { generateProcessosListPDF } from '../../utils/reports/generateListProcessPDF';
import FiltroProcessos from './FiltroProcessos';
import type { IClient } from '../../schema/InterfaceClient';
import dayjs from 'dayjs';
import { ClientService } from '../../services/ClientService';
import type { IColaborador } from '../../schema/InterfaceColaboradores';

const Processo: React.FC = () => {

  const navigate = useNavigate();

  const [data, setData] = React.useState<IProcesso[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fases = [
    {
      id: 'Judicial',
      value: 'Judicial'
    },
    {
      id: 'Extrajudicial',
      value: 'Extrajudicial'
    }
  ];

  const [fase, setFase] = useState<string>();

  const [mFactoracoes, setMFacturacoes] = useState<IProcessoModoFacturacao[]>([]);
  const [mFacturacao, setMFacturacao] = useState<string>();

  const [gestores, setGestores] = useState<IColaborador[]>([]);
  const [gestor, setGestor] = useState<string>();

  const [clientes, setClientes] = useState<IClient[]>([]);
  const [cliente, setCliente] = useState<number>();
  const [estados, setEstados] = useState<IProcessoStatus[]>([]);
  const [estado, setEstado] = useState<string>("");
  const hoje = dayjs();
  const duasSemanasAtras = hoje.subtract(14, "day");

  const [dataInicio, setDataInicio] = useState(
    duasSemanasAtras.format("YYYY-MM-DD")
  );
  const [dataFim, setDataFim] = useState(hoje.format("YYYY-MM-DD"));

  const [instituicoes, setInstituicoes] = useState<IProcessoInstituicoes[]>([]);
  const [instituicao, setInstituicaos] = useState<string>('');


  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      getAllProcessos();
      setClientes(await ClientService.getAll())
      setEstados(await ProcessoService.listStatus())
      setInstituicoes(await ProcessoService.listInstituicoes())
      setGestores(await ClientService.getAll())
      setMFacturacoes(await ProcessoService.listModoFacturacao())

    }, 1000)
  }, []);

  const getAllProcessos = async () => {
    try {

      const dataResponse = await ProcessoService.getAll({
        dataInicio,
        dataFim,
        clientId: cliente,
        estadoId: estado,
        fase: fase,
        gestorId: gestor,
        mFacturacaoId: mFacturacao,
        instituicaoId: instituicao
      });
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
    navigate(ROUTES_PATH.NewProcesso);
  };

  const handleEdit = (processo: IProcesso) => {
    navigate(`${ROUTES_PATH.NewProcesso}/${processo.id}`);
  };

  const handleView = (processo: IProcesso) => {
    navigate(`${ROUTES_PATH.NewProcesso}/view/${processo.id}`);
  };

  const handleExportPDF = () => {
    if (data.length > 0) {
      generateProcessosListPDF(data);
    }
  };

  const handleBuscar = () => {
    getAllProcessos()
  }

  const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
    const id = e.target.value as number;
    console.log("id do cliente", id)
    setCliente(id);
    // fetchProcessosByClientId(id);
  };

  return (
    <div>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
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

      <FiltroProcessos
        clientes={clientes}
        instituicoes={instituicoes}
        estados={estados}
        cliente={cliente}
        instituicao={instituicao}
        estado={estado}
        fases={fases}
        fase={fase}
        gestores={gestores}
        gestor={gestor}
        mFaturacoes={mFactoracoes}
        mFacturacao={mFacturacao}
        dataInicio={dataInicio}
        dataFim={dataFim}
        handleChangeCliente={handleChangeCliente}
        handleChangeFase={(e: React.ChangeEvent<HTMLSelectElement>) => setFase(e.target.value)}
        handleChangeGestor={(e: React.ChangeEvent<HTMLSelectElement>) => setGestor(e.target.value)}
        handleChangeFacturacao={(e: React.ChangeEvent<HTMLSelectElement>) => setMFacturacao(e.target.value)}
        handleChangeInstituicao={(e: React.ChangeEvent<HTMLSelectElement>) => setInstituicaos(e.target.value)}
        handleChangeEstado={(e: React.ChangeEvent<HTMLSelectElement>) => setEstado(e.target.value)}
        handleChangeDataInicio={(e: React.ChangeEvent<HTMLSelectElement>) => setDataInicio(e.target.value)}
        handleChangeDataFim={(e: React.ChangeEvent<HTMLSelectElement>) => setDataFim(e.target.value)}
        handleBuscar={handleBuscar}
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
