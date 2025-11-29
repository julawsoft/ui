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
} from "@mui/material";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import BoxTop from "../../components/common/BoxTop";
import { ClientService } from "../../services/ClientService";
import type { IProcesso } from "../../schema/InterfaceProcess";
import type { IClient } from "../../schema/InterfaceClient";
import { TimeSheetsService } from "../../services/TimeSheetsService";
import { DespesasService } from "../../services/DespesasService";
import type { ITimeSheets } from "../../schema/InterfaceTimeSheets";
import type { IDespesas } from "../../schema/interfaceDespesas";
import { parseValorBR } from "../../utils/data";
import { toast } from "react-toastify";
import { HonorariosService } from "../../services/HonorariosService";
import type { HonorarioInput } from "../../schema/InterfaceHonorarios";
import { useUserLogged } from "../../hooks/useUserLogged";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES_PATH } from "../../routes/routePaths";

interface IRegistro {
  id: number;
  tipo: "timesheet" | "despesas";
  descricao: string;
  colaborador: string;
  cliente: string;
  horas?: string | number;
  valor?: string | number;
  status: "aprovado" | "faturado";
}

interface ItemSelecionado extends IRegistro {
  valor: number;
}

export default function GerarCobranca() {

  const { user, saveUser, clearUser, hasAnyPermission, hasPermission } = useUserLogged();
  const navigate = useNavigate();


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

  const fetchClientes = async () => {
    try{
      setClientes(await ClientService.getAll());
    }catch(e){
      toast.error(String(e))
    }
  }

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

  const handleGerarHonorario = async () => {

    if (selecionados.length === 0)
      return toast.error("Selecione pelo menos um registo!");

    // Monta a lista de itens selecionados com todos os dados e valores
    const itensSelecionados: ItemSelecionado[] = registros
      .filter((r) => selecionados.includes(r.id))
      .map((r) => ({
        ...r,
        valor: valores[r.id] ?? Number(r.valor) ?? 0,
      }));

      const total = registros.reduce((acc, r) => {
        const valor = selecionados.includes(r.id)
          ? valores[r.id] ?? Number(r.valor) ?? 0
          : 0;
        return acc + valor;
      }, 0);

    const dataToSave: HonorarioInput = {
      clienteId: cliente!,
      processoId: processo!,
      colaboradorId: Number(user?.id),
      status: "pendente",
      custo: total,
      tipoHonorario: "despesas",
      items: itensSelecionados.map((item) => ({
        id: item.id,
        tipo: item.tipo,
        valor: item.valor,
      })),
    }

    const response = await HonorariosService.save(dataToSave)

    if(response){
      toast.success("Honorário criado com sucesso!");
      setTimeout(() => {
        navigate(`${ROUTES_PATH.ViewCobranca}/${response.id}`);
      })
    }
  };

  const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
    const id = e.target.value as number;
    setCliente(id);
    fetchProcessosByClientId(id);
  };

  const fetchAvalibleHonorarios = async () => {
    console.log("Buscar honorários para o cliente", cliente, "e processo", processo);

    const listDespesas = await DespesasService.getAll({
      clienteId: Number(cliente),
      processoId: Number(processo),
      statusId: "pendente",
    });

    const transformDespesas = listDespesas.map((dp: IDespesas) => ({
      id: dp.id,
      tipo: "despesas" as const,
      descricao: dp.tipoDespesasLabel,
      colaborador: dp.colaborador,
      cliente: dp.nomeCliente,
      horas: 0,
      valor: parseValorBR(String(dp.valor)),
      status: dp.status as "aprovado" | "faturado",
    }));

    setRegistros([...transformDespesas]);
  };

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista das Despesas", path: "/despesas" },
          { label: "Nova Cobrnaça" },
        ]}
      />

      <BoxTop title="Nova Cobrança" />

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
        {/* Cliente */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Cliente:</Typography>
          <Select
            size="small"
            value={cliente ?? ""}
            onChange={handleChangeCliente as any}
            sx={{ minWidth: 300 }}
            disabled={clientes.length === 0}
          >
            {clientes.map((c) => (
              <MenuItem key={c.denominacao} value={c.id}>
                {c.denominacao}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Processo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>Processo:</Typography>
          <Select
            size="small"
            value={processo ?? ""}
            onChange={(e: any) => setProcesso(e.target.value)}
            sx={{ minWidth: 300 }}
            disabled={processos.length === 0}
          >
            {processos.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.ref}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Buscar */}
        <Button
          onClick={fetchAvalibleHonorarios}
          disabled={!cliente}
          type="submit"
          variant="contained"
        >
          Buscar
        </Button>
      </Box>

      {/* Tabela de Itens */}
      <Box sx={{ p: 0, mt: 3, mb: 5 }}>
        <Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2 }}>
          Selecione os itens a faturar
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
              {registros.map((r) => (
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
                      onChange={(e) =>
                        handleAlterarValor(r.id, Number(e.target.value))
                      }
                      disabled={!selecionados.includes(r.id)}
                      sx={{ width: 100 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h6">
            Total:{" "}
            {total.toLocaleString("pt-PT", {
              style: "currency",
              currency: "AOA",
            })}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGerarHonorario}
            disabled={selecionados.length === 0}
          >
            Gerar Cobrança
          </Button>
        </Box>
      </Box>
    </>
  );
}
