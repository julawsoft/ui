// src/pages/Colaborador.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BoxCard from '../../components/common/BoxCard';
import DataTable from '../../components/common/DataTable';
import { columns, transformDataDespesas } from './transform';
import BoxTop from '../../components/common/BoxTop';
import { ROUTES_PATH } from '../../routes/routePaths';
import StateHandler from '../../components/common/StateHandler';
import { DespesasService } from '../../services/DespesasService';
import type { IDespesas } from '../../schema/interfaceDespesas';
import BreadcrumbsNav from '../../components/common/BreadcrumbsNav';
import PrimaryButton from '../../components/common/PrimaryButton';
import { generateDespesasListPDF } from '../../utils/reports/generateListDespesasPDF';
import FiltroDespesas from './FiltroDespesas';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { convertMoeda, parseValorBR } from '../../utils/data';
import type { IProcesso } from '../../schema/InterfaceProcess';
import type { IClient } from '../../schema/InterfaceClient';
import { ClientService } from '../../services/ClientService';
import dayjs from 'dayjs';
import SecondaryButton from '../../components/common/SecondaryButton';
import type { IFatura } from '../../schema/InterfaceHonorarios';

const estados = [
  {
    id: "pendente",
    nome: "Pendente"
  },
  {
    id: "faturado",
    nome: "Faturado"
  },
]


const Despesas: React.FC = () => {

  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);
  const [cliente, setCliente] = useState<number>();
  const [processo, setProcesso] = useState<number>();
  const [estado, setEstado] = useState<string>("");

  const [data, setData] = useState<IDespesas[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const navigate = useNavigate();

  const hoje = dayjs();
  const duasSemanasAtras = hoje.subtract(14, "day");

  const [dataInicio, setDataInicio] = useState(
    duasSemanasAtras.format("YYYY-MM-DD")
  );
  const [dataFim, setDataFim] = useState(hoje.format("YYYY-MM-DD"));

  const getListDespesas = async () => {

    try {
      const response = await DespesasService.getAll({
        dataInicio,
        dataFim,
        clienteId: cliente,
        processoId: processo,
        statusId: String(estado),
      })
      setData(response)
      setIsLoading(false)
    } catch (e) {
      setError(String(e))
      toast.error(String(e))
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(async () => {
      await getListDespesas()
      setClientes(await ClientService.getAll())
    }, 1000)
  }, []);


  const fetchProcessosByClientId = async (idClient: number) =>
    setProcessos(await ClientService.getProcessos(idClient));

  const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
    const id = e.target.value as number;
    console.log("id do cliente", id)
    setCliente(id);
    fetchProcessosByClientId(id);
  };

  const handleBuscar = () => {
    console.log("Buscar com filtros:", estado)
    getListDespesas()
  }

  const handleNovaDespesa = () => {
    navigate(ROUTES_PATH.NewDespesas);
  };

  const handleEdit = (despesas: IDespesas) => {
    navigate(`${ROUTES_PATH.NewDespesas}/${despesas.id}`);
  };

  const onVerCobranca = (despesa: IDespesas) => {
    //
    toast.warn("")
  };

  const handleExportPDF = () => {
    if (data.length > 0) {
      generateDespesasListPDF(data);
    }
  };

  const totalDespesas = (): string => {
    const totalCusto = data.reduce((acc, t) => {
      if (!t.valor) return acc; // ignora se não houver valor
      let c = acc + parseValorBR(String(t.valor))

      return c
    }, 0);

    const custo = Math.floor(totalCusto)
      .toString()
      .padStart(2, "0");

    return `${convertMoeda(custo)}`;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleExport = (type: string) => {
    if (data.length > 0) {
      generateDespesasListPDF(data);
    }
    handleMenuClose();
  };

  const gerarCobranca = () => {
    navigate(`${ROUTES_PATH.GerarCobranca}`);
  }
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
            <SecondaryButton onClick={gerarCobranca}>Gerar Cobrança</SecondaryButton>
          </>
        }
      />

      <FiltroDespesas
        clientes={clientes}
        processos={processos}
        estados={estados}
        cliente={cliente}
        processo={processo}
        estado={estado}
        dataInicio={dataInicio}
        dataFim={dataFim}
        handleChangeCliente={(e: any) => handleChangeCliente(e)}
        handleChangeProcesso={(e: any) => setProcesso(e.target.value)}
        handleChangeEstado={(e: any) => setEstado(e.target.value)}
        handleChangeDataInicio={(e: any) => setDataInicio(e.target.value)}
        handleChangeDataFim={(e: any) => setDataFim(e.target.value)}
        handleBuscar={handleBuscar}

      />

      <BoxCard>
        <StateHandler
          isLoading={isLoading}
          error={error}
          hasData={data.length > 0}
        />

        {!isLoading && !error && data.length > 0 && (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                p: 1.5,
                borderBottom: "1px solid #e0e0e0",
                background: "#eef1f4",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Typography variant="body1" sx={{ color: "#333" }}>
                <strong>Total despesas:</strong> {totalDespesas()} &nbsp;  &nbsp;
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<ExpandMore />}
                  onClick={handleMenuOpen}
                >
                  Exportar
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={() => handleExport("PDF")}>PDF</MenuItem>
                  <MenuItem onClick={() => handleExport("excel")}>Excel</MenuItem>
                </Menu>
              </Box>
            </Box>
            <DataTable
              columns={columns}
              rows={transformDataDespesas(data, handleEdit, onVerCobranca)}
            />
          </>
        )}
      </BoxCard>
    </div>
  );
};

export default Despesas;
