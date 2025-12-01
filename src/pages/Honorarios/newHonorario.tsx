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
  MenuItem,
  Select,
  Chip,
  Divider,
} from "@mui/material";
import BreadcrumbsNav from "../../components/common/BreadcrumbsNav";
import BoxTop from "../../components/common/BoxTop";
import { ClientService } from "../../services/ClientService";
import type { IProcesso } from "../../schema/InterfaceProcess";
import type { IClient } from "../../schema/InterfaceClient";
import { TimeSheetsService } from "../../services/TimeSheetsService";
import type { ITimeSheets } from "../../schema/InterfaceTimeSheets";
import { toast } from "react-toastify";
import { HonorariosService } from "../../services/HonorariosService";
import { IHonorarios, type HonorarioInput } from "../../schema/InterfaceHonorarios";
import { useUserLogged } from "../../hooks/useUserLogged";
import { useNavigate } from "react-router-dom";
import { ProcessoService } from "../../services/ProcessoService";
import { formatMoedaAOA } from "../../utils/moeda";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { generateInvoiceAvencaPDF } from "../../utils/reports/generateInvoiceAvencaPDF";
import { MODO_FACTURAMENTO } from "./utils";
import { generateInvoiceFixoPDF } from "../../utils/reports/generateInvoiceFixoPDF";
import { parseValorBR } from "../../utils/data";
import Input from "../../components/common/Input";
import { generateInvoiceSuccessFeePDF } from "../../utils/reports/generateInvoiceSuccessFeePDF";

interface IRegistro {
  id: number;
  tipo: "timesheet" | "despesas";
  descricao: string;
  tarefa: string;
  colaborador: string;
  cliente: string;
  horas?: string | number;
  valor?: string | number;
  status: "aprovado" | "faturado";
  colaboradorTaxa?: string;
  dataRegisto: string;
}

interface ItemSelecionado extends IRegistro {
  valor: number;
}

export default function CriarHonorario() {

  const { user } = useUserLogged();
  const navigate = useNavigate();


  const [cliente, setCliente] = useState<number>();
  const [processo, setProcesso] = useState<number>();
  const [registros, setRegistros] = useState<IRegistro[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [valores, setValores] = useState<Record<number, number>>({});
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [clientes, setClientes] = useState<IClient[]>([]);

  const [, setIsAvenca] = useState<boolean>(false)
  const [openConfirm, setOpenConfirm] = useState(false);
  const [canGerarHonorario, setCanGerarHonorario] = useState(false);

  const [processoSelected, setProcessoSelected] = useState<IProcesso>();
  const [parcelas, setParcelas] = useState<IHonorarios[]>();
  const [valorParcela, setValorParcela] = useState<number>(0);

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

  const handleGerarHonorario = async () => {
    setOpenConfirm(true)
  };

  const fetchParcelas = async () => setParcelas(await HonorariosService.getParcelas(Number(processoSelected?.id)))

  const handleConfirmRegisto = async () => {

    // verificar o tipo de faturamento
    if (processoSelected?.modo_facturacao.toString() === MODO_FACTURAMENTO.FIXO) return saveHonorarioFixo()
    if (processoSelected?.modo_facturacao.toString() === MODO_FACTURAMENTO.SUCCESS_FEE) return saveHonorarioSuccessFee()


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
      tipoHonorario: "timesheet",
      items: itensSelecionados.map((item) => ({
        id: item.id,
        tipo: item.tipo,
        valor: item.valor,
      })),
    }

    const response = await HonorariosService.save(dataToSave)

    if (response) {
      toast.success("Honorário criado com sucesso!");
      setTimeout(() => {
        navigate(`/invoice-honorarios/${response.id}`);
      })
    }
  }


  const saveHonorarioFixo = async () => {
    // verificar o tipo de faturamento

    if (!processoSelected)
      return toast.error("Selecione pelo menos um registo!");

    const dataToSave: HonorarioInput = {
      clienteId: cliente!,
      processoId: processo!,
      colaboradorId: Number(user?.id),
      status: "pendente",
      custo: Number(processoSelected.valor_total),
      tipoHonorario: "timesheet",
      items: []
    }

    const response = await HonorariosService.save(dataToSave)

    if (response) {
      toast.success("Honorário criado com sucesso!");
      setTimeout(() => {
        navigate(`/invoice-honorarios/${response.id}`);
      })
    }
  }

  const saveHonorarioSuccessFee = async () => {
    // verificar o tipo de faturamento

    if (!processoSelected)
      return toast.error("Selecione pelo menos um registo!");

    const dataToSave: HonorarioInput = {
      clienteId: cliente!,
      processoId: processo!,
      colaboradorId: Number(user?.id),
      status: "pendente",
      custo: Number(processoSelected.valor_total),
      tipoHonorario: "timesheet",
      items: []
    }

    const response = await HonorariosService.save(dataToSave)

    if (response) {
      toast.success("Honorário criado com sucesso!");
      fetchParcelas()
      setOpenConfirm(false)
      handleExportarSuccessFeePDF()
      setValorParcela(0)
    }
  }

  const handleChangeCliente = (e: React.ChangeEvent<{ value: unknown }>) => {
    const id = e.target.value as number;
    setCliente(id);
    fetchProcessosByClientId(id);
  };

  const fetchAvalibleHonorarios = async () => {

    let processoSelect = await ProcessoService.getById(Number(processo))

    setIsAvenca(processoSelect.modo_facturacao.toString() === MODO_FACTURAMENTO.AVENCA)
    setProcessoSelected(processoSelect)
    if (processoSelect.modo_facturacao.toString() === MODO_FACTURAMENTO.SUCCESS_FEE)
      fetchParcelas()

    const listTimeSheets = await TimeSheetsService.getAll({
      clienteId: Number(cliente),
      processoId: Number(processo),
      statusId: "aprovado",
    });

    const transformTimeSheets = listTimeSheets.map((ts: ITimeSheets) => ({
      id: ts.id,
      tipo: "timesheet" as const,
      descricao: ts.descricao,
      tarefa: ts.tarefa,
      colaborador: ts.colaborador,
      colaboradorTaxa: formatMoedaAOA(ts.colaboradorTaxa),
      cliente: ts.cliente?.toString() || "",
      horas: ts.horas,
      valor: 0,
      status: ts.status as "aprovado" | "faturado",
      dataRegisto: ts.data_registo.substring(0, 10)
    }));

    setRegistros([...transformTimeSheets]);
  };


  const handleExportarPDF = () => {

    let clienteFilter = clientes.filter((item => item.id === cliente))[0]
    let processoFilter = processos.filter((item => item.id === processo))[0]

    const itensSelecionados: ItemSelecionado[] = registros
      .filter((r) => selecionados.includes(r.id))
      .map((r) => ({
        ...r,
        valor: valores[r.id] ?? Number(r.valor) ?? 0,
      }));

    generateInvoiceAvencaPDF(itensSelecionados, clienteFilter, processoFilter, total)

    setTimeout(() => {
      setCanGerarHonorario(true)
    }, 3000)

  }

  const handleExportarFixoPDF = () => {

    let clienteFilter = clientes.filter((item => item.id === cliente))[0]
    let processoFilter = processos.filter((item => item.id === processo))[0]

    if(processoSelected){

      generateInvoiceFixoPDF(processoSelected, clienteFilter, processoFilter, Number(processoSelected.valor_total))
      setTimeout(() => {
        setCanGerarHonorario(true)
      }, 3000)
    }
  }

  const handleExportarSuccessFeePDF = () => {
    let clienteFilter = clientes.filter((item => item.id === cliente))[0]
    let processoFilter = processos.filter((item => item.id === processo))[0]

    if(processoSelected)
      generateInvoiceSuccessFeePDF(processoSelected, clienteFilter, Number(processoFilter.valor_total))
  }

  const somaValores = (lista: any[]) =>
    lista.reduce((acc, p) => {
      const valor = Number(parseValorBR(p.processo_factura_custo));
      return acc + (isNaN(valor) ? 0 : valor);
    }, 0);

  return (
    <>
      <BreadcrumbsNav
        items={[
          { label: "Início", path: "/" },
          { label: "Lista dos honorários", path: "/honorarios" },
          { label: "Novo registo do honorário" },
        ]}
      />
      <BoxTop title="Registo Honorário" />
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
              <MenuItem key={c.id} value={c.id}>
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

      {/** No caso de avenca */}
      {processoSelected && processoSelected.modo_facturacao.toString() === MODO_FACTURAMENTO.AVENCA ? (<Box sx={{ p: 0, mt: 3, mb: 5 }}>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2, fontWeight: 600 }}>
            Selecione os itens a faturar
          </Typography>

          <Chip
            label={processoSelected && processoSelected.modo_facturacao.toString().toUpperCase()}
            color={"success"}
            size="medium"
          />
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ background: "#f5f5f5" }}>
              <TableRow>
                <TableCell />
                <TableCell>Data Registo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Tarefa</TableCell>
                <TableCell>Colaborador</TableCell>
                <TableCell>Taxa Horária</TableCell>
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
                  <TableCell>{r.dataRegisto}</TableCell>
                  <TableCell>{r.descricao}</TableCell>
                  <TableCell>{r.tarefa}</TableCell>
                  <TableCell>{r.colaborador}</TableCell>
                  <TableCell>{r.colaboradorTaxa}</TableCell>
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
            disabled={!canGerarHonorario}
          >
            Gerar Honorário
          </Button>
          <Button
            variant="outlined"
            color="info"
            onClick={handleExportarPDF}
            disabled={total === 0}
          >
            Exportar PDF
          </Button>
        </Box>
      </Box>) : (null)}

      {/** No caso de sucess fee */}
      {processoSelected && processoSelected.modo_facturacao.toString() === MODO_FACTURAMENTO.SUCCESS_FEE ?
        (
          <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
              <Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2, fontWeight: 600 }}>
              </Typography>

              <Chip
                label={processoSelected && processoSelected.modo_facturacao.toString().toUpperCase()}
                color={"success"}
                size="medium"
              />
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ background: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Ref. Processo</TableCell>
                    <TableCell>Assunto Processo</TableCell>
                    <TableCell>Nº Judicial</TableCell>
                    <TableCell>Fase</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Valor (AOA)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={processoSelected.id}>
                    <TableCell>{processoSelected.ref}</TableCell>
                    <TableCell>{processoSelected.assunto}</TableCell>
                    <TableCell>{processoSelected.n_processo_judicial}</TableCell>
                    <TableCell>{processoSelected.fase}</TableCell>
                    <TableCell>{processoSelected.cliente}</TableCell>
                    <TableCell>{formatMoedaAOA(processoSelected.valor_total) ?? "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider />

            {/** Parcelas já pagas */}

            <>
              <Box bgcolor={'#fff'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                <Typography fontSize="1.1rem" p={1} fontWeight="400" sx={{ fontWeight: 600 }}>
                  Parcelas geradas
                </Typography>
              </Box>

              {parcelas && parcelas.length ?
                (
                  <>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead sx={{ background: "#f5f5f5" }}>
                          <TableRow>
                            <TableCell>Data Registo</TableCell>
                            <TableCell>Ref. Processo</TableCell>
                            <TableCell>Nº Judicial</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Valor (AOA)</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Exportar</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            parcelas.map((parcela) => (
                              <TableRow key={parcela.id}>
                                <TableCell>{parcela.processo_factura_data_registo.substring(0, 10)}</TableCell>
                                <TableCell>{parcela.processo_referencia}</TableCell>
                                <TableCell>{parcela.processo_n_processo_judicial}</TableCell>
                                <TableCell>{parcela.cliente}</TableCell>
                                <TableCell>{formatMoedaAOA(parseValorBR(parcela.processo_factura_custo)) ?? "-"}</TableCell>
                                <TableCell>{
                                  <span
                                    style={{
                                      color: parcela.status === 'pendente' ? '#FFA500' : parcela.status === 'pago' ? '#4CAF50' : '#9e9e9e',
                                      fontWeight: 600,
                                      textTransform: "capitalize"
                                    }}
                                  >
                                    {parcela.status ?? "pendente"}
                                  </span>
                                }</TableCell>
                                <TableCell>{<Button
                                  variant="outlined"
                                  color="error"
                                  size="small"
                                  onClick={() => handleExportarSuccessFeePDF()}
                                >
                                  PDF
                                </Button>}</TableCell>
                              </TableRow>

                            ))
                          }

                        </TableBody>
                      </Table>
                    </TableContainer>

                    {
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mt: 3,
                          mb: 3,
                          alignItems: "center",
                          gap: 3,
                        }}
                      >
                        <Box bgcolor={'#d3d3d3'} p={1}>
                          <Typography>
                            Total de parcelas pagas
                          </Typography>
                          <Typography fontSize={'1em'} fontWeight={'bold'} justifyContent={'end'} display={'flex'}>
                            {formatMoedaAOA(somaValores(parcelas))}
                          </Typography>
                        </Box>

                        <Box bgcolor={'#d3d3d3'} p={1}>
                          <Typography color="red">
                            Parcelas em falta
                          </Typography>
                          <Typography fontSize={'1em'} fontWeight={'bold'} justifyContent={'end'} display={'flex'}>
                            {formatMoedaAOA(Number(processoSelected.valor_total) - somaValores(parcelas))}
                          </Typography>
                        </Box>

                        {/*
                        <Button
                          variant="outlined"
                          color="info"
                          onClick={handleExportarFixoPDF}
                          disabled={processoSelected.valor_total === 0}
                        >
                          Exportar PDF
                        </Button>
                        */}

                      </Box>
                    }
                  </>
                ) : (
                  <>
                    <Typography fontSize="1.1rem" fontWeight="400" sx={{ mt: 2, fontWeight: 600 }}>
                      Nenhuma parcela encontrada
                    </Typography>
                  </>
                )}


            </>


            {/** Gerar Parcela */}

            <>
              <Box bgcolor={'#fff'} p={2} display={'flex'} justifyContent={'end'} alignItems={'center'} gap={2} mt={2} mb={2}>
                <Box>
                  <Input label="Valor da Parcela" onChange={(e: any) => setValorParcela(e.target.value)} value={String(valorParcela)} />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGerarHonorario}
                  disabled={valorParcela == 0}
                >
                  Gerar Honorário
                </Button>

              </Box>


            </>

          </>
        ) : (null)}

      {/** No caso de fixo */}

      {processoSelected && processoSelected.modo_facturacao.toString() === MODO_FACTURAMENTO.FIXO ?
        (
          <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
              <Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2, fontWeight: 600 }}>
              </Typography>

              <Chip
                label={processoSelected && processoSelected.modo_facturacao.toString().toUpperCase()}
                color={"success"}
                size="medium"
              />
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ background: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Ref. Processo</TableCell>
                    <TableCell>Assunto Processo</TableCell>
                    <TableCell>Nº Judicial</TableCell>
                    <TableCell>Fase</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Valor (AOA)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={processoSelected.id}>
                    <TableCell>{processoSelected.ref}</TableCell>
                    <TableCell>{processoSelected.assunto}</TableCell>
                    <TableCell>{processoSelected.n_processo_judicial}</TableCell>
                    <TableCell>{processoSelected.fase}</TableCell>
                    <TableCell>{processoSelected.cliente}</TableCell>
                    <TableCell>{formatMoedaAOA(processoSelected.valor_total) ?? "-"}</TableCell>
                  </TableRow>
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
                Total Fixo:{" "}
                {formatMoedaAOA(processoSelected.valor_total)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGerarHonorario}
                disabled={!canGerarHonorario}
              >
                Gerar Honorário
              </Button>
              <Button
                variant="outlined"
                color="info"
                onClick={handleExportarFixoPDF}
                disabled={processoSelected.valor_total === 0}
              >
                Exportar PDF
              </Button>
            </Box>
          </>
        ) : (null)
      }
      {/** No caso de probono */}
      {processoSelected && processoSelected.modo_facturacao.toString() === MODO_FACTURAMENTO.PRO_BONO ? (<Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2, fontWeight: 600 }}>
        PROCESSO ISENTO DO COBRANÇA
      </Typography>) : (
        null
      )}
      {/** No caso de defesa oficiosa */}
      {processoSelected && processoSelected.modo_facturacao.toString() === MODO_FACTURAMENTO.DEFESA_OFICIOSA ? (
        <Typography fontSize="1.1rem" fontWeight="400" sx={{ mb: 2, fontWeight: 600 }}>
          PROCESSO ISENTO DO COBRANÇA
        </Typography>
      ) : (
        null
      )}

      <ConfirmDialog
        open={openConfirm}
        title="Confirmar registo"
        message="Tem certeza que deseja gerar o honorário ?"
        onConfirm={handleConfirmRegisto}
        onCancel={() => setOpenConfirm(false)}
        textBtn="Registar"
      />


    </>


  );
}


