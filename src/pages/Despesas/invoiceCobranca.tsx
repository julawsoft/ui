import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import "jspdf-autotable";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import { HonorariosService } from "../../services/HonorariosService";
import { generateInvoice } from "../../utils/reports/generateInvoicePDF";
import type { IFatura } from "../../schema/InterfaceHonorarios";

interface IItem {
  id: number;
  tipo: "timesheet" | "despesa";
  descricao: string;
  colaborador: string;
  horas?: number;
  valor: number;
}

export default function InvoiceCobranca() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [honorario, setHonorario] = useState<IFatura>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await HonorariosService.getFacturaById(Number(id));
        setHonorario(data);
      } catch (error) {
        console.error("Erro ao buscar fatura:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleExportarPDF = () => {
    generateInvoice(honorario)
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!honorario) {
    return (
      <Typography sx={{ p: 4 }}>
        Nenhuma fatura encontrada para o ID {id}.
      </Typography>
    );
  }

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista das Despesas", path: "/despesas" },
          { label: "Nova Cobrança", path: "/cobranca" },
          { label: "Factura da Cobrança" },
        ]}
      />

      <Box sx={{ p: 4, mx: "auto", background: "#fff" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Cobrança Despesa / Invoice
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">
            <strong>Nº:</strong> {honorario.processo_facturacao_id}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Cliente:</strong> {honorario.cliente}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Data de Emissão:</strong> {honorario.processo_facturacao_data_registo}
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ background: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell align="right">Valor (AOA)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {honorario.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.tipo.toUpperCase()}</TableCell>
                  <TableCell>{item.tipoDespesa}</TableCell>
                  <TableCell align="right">
                    {item.custo.toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "AOA",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="h6">
            Total:{" "}
            {Number(honorario.processo_custo).toLocaleString("pt-PT", {
              style: "currency",
              currency: "AOA",
            })}
          </Typography>
          <Box>
            <Button variant="outlined" sx={{ mr: 2 }} onClick={() => window.print()}>
              Imprimir
            </Button>
            <Button variant="contained" color="primary" onClick={handleExportarPDF}>
              Exportar PDF
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
