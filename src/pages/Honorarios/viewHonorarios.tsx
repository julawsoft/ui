import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import { HonorariosService } from "../../services/HonorariosService";
import type { IHonorarioInvoice } from "../../schema/InterfaceHonorarios";
import { boolean } from "zod";
import { generateInvoiceAvencaPDF } from "../../utils/reports/generateInvoiceAvencaPDF";
import { formatMoedaAOA } from "../../utils/moeda";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useUserLogged } from "../../hooks/useUserLogged";
import { toast } from "react-toastify";
import { ROUTES_PATH } from "../../routes/routePaths";

interface IItem {
  id: number;
  tipo: "timesheet" | "despesa";
  descricao: string;
  colaborador: string;
  horas?: number;
  valor: number;
}

interface IHonorario {
  id: number;
  numero: string;
  cliente: string;
  data_emissao: string;
  itens: IItem[];
  total: number;
}

const exemploHonorario: IHonorario = {
  id: 1,
  numero: "HON-2025-001",
  cliente: "CETIM - Centro de Tecnologia e Inovação",
  data_emissao: "2025-10-29",
  itens: [
    { id: 1, tipo: "timesheet", descricao: "Consultoria jurídica", colaborador: "Maria Silva", horas: 8, valor: 25000 },
    { id: 2, tipo: "despesa", descricao: "Deslocação Luanda-Sumbe", colaborador: "Carlos Alberto", valor: 15000 },
  ],
  total: 40000,
};

export default function ViewHonorario() {

  const { id } = useParams<{ id: string }>();
  const { user } = useUserLogged()
  const navigate = useNavigate();

  const [data, setData] = useState<IHonorarioInvoice>()
  const [isAvenca, setIsAvenca] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState(false);

  if (!id) return 0

  useEffect(() => {
    setTimeout(() => {
      fetchDataHonorarioById()
    }, 500)
  }, [])

  const honorario = exemploHonorario;

  const handleExportarPDF = () => {

    const registos: any = data?.items.map((item, index) => ({
      id: item.processo_factura_id,
      tipo: String(item?.tipo),
      descricao: item.descricao,
      tarefa: item.tarefa,
      colaborador: item.colaborador,
      cliente: data.cliente,
      horas: String(item.horas),
      valor: item.custo,
      status: data.status,
      colaboradorTaxa: item.colaboradorTaxa,
      dataRegisto: item.dataRegistoTimeSheet ? new Date(item.dataRegistoTimeSheet.toString()).toLocaleDateString().substring(0, 10) :
        new Date(item.data_registo.toString()).toLocaleDateString().substring(0, 10)
    }))

    const cliente: any = {
      denominacao: data?.cliente,
      nif: data?.clienteNif,
      contacto_cobranca: data?.clienteContacto
    }
    const processo: any = {
      ref: data?.processo_referencia,
      n_processo_judicial: data?.processo_n_processo_judicial
    }

    console.log(cliente)
    console.log(processo)

    generateInvoiceAvencaPDF(registos, cliente, processo, Number(data?.processo_factura_custo))

  };

  const fetchDataHonorarioById = async () => {
    const response = await HonorariosService.getHonorarioInvoice(Number(id))
    setIsAvenca(response.processo_modo_facturacao.toString().toLowerCase() === "avença")
    setData(response)
  }

  const aprovarPagamento = () => {
    setOpenConfirm(true)
  }
  const handleAprovarPagamento = async () => {

    try {
      const response = await HonorariosService.approveHonorarioInvoice(Number(data?.processo_factura_id), Number(user?.id))
      if (response) {
        toast.success("Aprovado com sucesso!")
        setTimeout(() => {
          navigate(`${ROUTES_PATH.Honorario}`)
        }, 2000)
      }
    } catch (e) {
      toast.error(String(e))
    }
  }

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista dos honorários", path: "/honorarios" },
          { label: "Fatura do Honorário" },
        ]}
      />
      <Box sx={{ p: 4, mx: "auto", background: "#fff" }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Fatura Honorário
          </Typography>

          <Chip
            label={data?.status.toUpperCase()}
            color={data?.status === "pendente" ? "warning" : "success"}
            size="medium"
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box justifyContent={'space-between'} display={'flex'} >
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">
              <strong>Nome da Empresa</strong>
            </Typography>
            <Typography variant="subtitle1">
              Endereço da Empresa
            </Typography>
            <Typography variant="subtitle1">
              <strong>NIF:</strong> NIF da Empresa
            </Typography>
            <Typography variant="subtitle1">
              Contacto empresa
            </Typography>
            <Typography variant="subtitle1">
              email Empresa
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">
              <strong>Cliente: </strong> {data?.cliente}
            </Typography>
            <Typography variant="subtitle1">
              <strong>NIF:</strong> {data?.clienteNif}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Contacto:</strong> {data?.clienteContacto}
            </Typography>

            <Typography variant="subtitle1" mt={2}>
              <strong>Referência:</strong> {data?.processo_referencia}
            </Typography>
            <Typography variant="subtitle1">
              <strong>N.º Processo Judicial:</strong> {data?.processo_n_processo_judicial}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />
        <Box justifyContent={'end'} display={'flex'}>
          <Typography variant="subtitle1">
            <strong>Data emissão: </strong> {data?.processo_factura_data_registo}
          </Typography>
        </Box>

        {
          isAvenca ? (
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead sx={{ background: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Tarefa</TableCell>
                    <TableCell>Horas</TableCell>
                    <TableCell align="right">Valor (AOA)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.items.map((item, index) => (
                    <TableRow key={index + 1}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.dataRegistoTimeSheet ? new Date(item.dataRegistoTimeSheet.toString()).toLocaleDateString().substring(0, 10) :
                        new Date(item.data_registo.toString()).toLocaleDateString().substring(0, 10)
                      }</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell>{item.tarefa}</TableCell>
                      <TableCell>{item.horas ?? "-"}</TableCell>
                      <TableCell align="right">
                        {formatMoedaAOA(data?.processo_factura_custo)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : ('b ')
        }


        <Divider />


        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="h6">
            Total:{" "}
            {formatMoedaAOA(String(data?.processo_factura_custo))}
          </Typography>

          <Box>
            {
              data?.status == "pendente" ? (<Button color="primary" variant="contained" sx={{ mr: 2 }} onClick={() => aprovarPagamento()}>
                Aprovar Pagamento
              </Button>) : (null)
            }
            <Button variant="outlined" color="primary" onClick={handleExportarPDF}>
              Exportar PDF
            </Button>
          </Box>
        </Box>
      </Box>

      <ConfirmDialog
        open={openConfirm}
        title="Confirmar apagamanto"
        message="Tem certeza que deseja aprovar o pagamento dos Honorários ?"
        onConfirm={handleAprovarPagamento}
        onCancel={() => setOpenConfirm(false)}
        textBtn="Aprovar"
        btnColor="success"
      />
    </>
  );
}
