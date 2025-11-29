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
  Checkbox,
  TextField,
  Button,
  Chip,
  MenuItem,
  Select,
  Stack,
  Grid,
} from "@mui/material";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import BoxTop from "../../components/common/BoxTop";
import { Add } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import SelectBox from "../../components/common/SelectBox";
import { ClientService } from "../../services/ClientService";
import type { IProcesso } from "../../schema/InterfaceProcess";
import type { IClient } from "../../schema/InterfaceClient";
import { TimeSheetsService } from "../../services/TimeSheetsService";
import { DespesasService } from "../../services/DespesasService";
import { tr } from "zod/v4/locales";
import { hostname, transform } from "zod";
import type { ITimeSheets } from "../../schema/InterfaceTimeSheets";
import type { IDespesas } from "../../schema/interfaceDespesas";
import { convertMoeda, parseValorBR } from "../../utils/data";

interface IRegistro {
  id: number;
  tipo: "timesheet" | "despesa";
  descricao: string;
  colaborador: string;
  cliente: string;
  horas?: string | number;
  valor?: string | number;
  status: "aprovado" | "faturado";
}

/*
const dados: IRegistro[] = [
  { id: 1, tipo: "timesheet", descricao: "Consultoria jurídica", colaborador: "Maria Silva", cliente: "CETIM", horas: 8, status: "aprovado" },
  { id: 2, tipo: "timesheet", descricao: "Desenvolvimento módulo RH", colaborador: "José Inácio", cliente: "CETIM", horas: 6, status: "aprovado" },
  { id: 3, tipo: "despesa", descricao: "Transporte Luanda-Sumbe", colaborador: "Carlos Alberto", cliente: "CETIM", valor: 15000, status: "aprovado" },
];
*/

export default function CriarHonorario() {
  const [cliente, setCliente] = useState<number>();
  const [processo, setProcesso] = useState<number>();
  const [registros, setRegistros] = useState<IRegistro[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [valores, setValores] = useState<Record<number, number>>({});

  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);


  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => setClientes(await ClientService.getAll());
  const fetchProcessosByClientId = async (idClient: number) =>
    setProcessos(await ClientService.getProcessos(idClient));


  const handleSelecionar = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleAlterarValor = (id: number, valor: number) => {
    setValores((prev) => ({ ...prev, [id]: valor }));
  };

  const total = selecionados.reduce(
    (acc, id) => acc + (valores[id] || 0),
    0
  );

  const handleGerarHonorario = () => {
    if (selecionados.length === 0) return alert("Selecione pelo menos um registo!");
    alert(`Honorário criado com total de ${total.toLocaleString("pt-PT", { style: "currency", currency: "AOA" })}`);
    // Enviar dados ao backend:
    // POST /api/honorarios { cliente, itens: selecionados.map(id => ({id, valor: valores[id]})) }
  };

  const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
      setCliente(e.target.value as number);
      fetchProcessosByClientId(Number(e.target.value));
  }

  const fetchAvalibleHonorarios = async () => {
    // buscar os honorarios disponiveis para o cliente e processo selecionado
    console.log("buscar honorarios para o cliente ", cliente, " e processo ", processo);

   const listTimeSheets = await  TimeSheetsService.getAll({ clienteId: Number(cliente), processoId: Number(processo), statusId: 'aprovado' })
   const listDespesas =  await DespesasService.getAll({ clienteId: Number(cliente), processoId: Number(processo), statusId: 'pendente' })

   console.log("timesheets ", listTimeSheets)
    console.log("despesas ", listDespesas)

    const trasformTimeSheets = listTimeSheets.map((ts: ITimeSheets) => ({
      id: ts.id,
      tipo: "timesheet" as const,
      descricao: ts.descricao,
      colaborador: ts.colaborador,
      cliente: ts.cliente?.toString() || "",
      horas: ts.horas,
      valor: 0,
      status: ts.status as "aprovado" | "faturado",
    }));

    const transformDespesas = listDespesas.map((dp: IDespesas) => ({
      id: dp.id,
      tipo: "despesa" as const,
      descricao: dp.tipoDespesasLabel,
      colaborador: dp.colaborador,
      cliente: dp.nomeCliente,
      horas: 0,
      valor: parseValorBR(String(dp.valor)),
      status: dp.status as "aprovado" | "faturado",
    }))

    console.log("transformDespesas", transformDespesas)

    setRegistros([
      ...trasformTimeSheets,
      ...transformDespesas
    ])

  }

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista dos honorarios", path: "/honorarios" },
          { label: "Novo registo do honorario" },
        ]}
      />

      <BoxTop
        title="Registo Honorario"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          p: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Cliente:</Typography>
          <Select
            size="small"
            value={cliente}
            onChange={(e: any) => handleChangeCliente(e)}
            sx={{ minWidth: 300 }}
            disabled={clientes.length === 0}
          >
            {
              clientes.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.denominacao}</MenuItem>
              ))
            }
      
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Processo:</Typography>
          <Select
            size="small"
            value={cliente}
            onChange={(e:any) => setProcesso(e.target.value)}
            sx={{ minWidth: 300 }}
            disabled={processos.length === 0}
          >

            {
              processos.map((p) => (
                <MenuItem key={p.ref} value={p.id}>{p.ref}</MenuItem>
              ))
            }          
           
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>

          <Button
          onClick={fetchAvalibleHonorarios}
          disabled={!cliente}
          type="submit" variant="contained">
            Buscar
          </Button>
        </Box>


      </Box>

      <Box sx={{ p: 0, mt: 3, mb: 5 }}>
        <Typography fontSize={'1.1rem'} fontWeight={'400'} sx={{ mb: 2 }}>
          Selecione os itens à faturar
        </Typography>


        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#f5f5f5" }}>
              <TableRow>
                <TableCell />
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Colaborador</TableCell>
                <TableCell>Horas</TableCell>
                <TableCell>Valor (AOA)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registros
                .map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <Checkbox
                        checked={selecionados.includes(r.id)}
                        onChange={() => handleSelecionar(r.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={r.tipo.toUpperCase()}
                        color={r.tipo === "timesheet" ? "primary" : "success"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{r.descricao}</TableCell>
                    <TableCell>{r.colaborador}</TableCell>
                    <TableCell>{r.horas ?? "-"}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={valores[r.id] ?? r.valor ?? ""}
                        onChange={(e) => handleAlterarValor(r.id, Number(e.target.value))}
                        disabled={!selecionados.includes(r.id)}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, alignItems: "center", gap: 3 }}>
          <Typography variant="h6">
            Total: {total.toLocaleString("pt-PT", { style: "currency", currency: "AOA" })}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleGerarHonorario}>
            Gerar Honorário
          </Button>
        </Box>
      </Box>
    </>

  );
}
