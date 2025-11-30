export interface IProcessoFacturas {
  id: number;
  ref: string;
  assunto: string;
  area: string;
  fase: string;
  instituicao_id: number;
  modo_facturacao_id: number;
  gestor_id: number;
  cliente_id: number;
  contra_parte: string;
  data_registo: string;
  data_suspensao: string;
  colaborador_id_suspendeu: number | null;
  data_encerramento: string;
  colaborador_id_encerrou: string | null;
  metodologia: string;
  estrategia: string;
  factos: string;
  objectivos: string;
  dados_importantes: string;
  horas_mes: string | null;
  valor_total: number;
  data_emissao_factura: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  n_processo_judicial: string | null;
  horas: string;
  custo: number;
  status: string;
  data_registo_factura: string;
  colaborador: string;
  cliente: string;
  estado_processo: string;
}

export interface IHonorarios {
  id: number;
  processo_factura_id: number;
  processo_factura_horas: string;
  processo_factura_custo: string;
  data_registo_timesheet: string;
  tarefa: string;
  processo_referencia: string;
  processo_n_processo_judicial: string | null;
  processo_modo_facturacao: string;
  processo_estado: string;
  cliente: string;
  colaborador: string;
  processo_factura_data_registo: string;
  tipo_honorario: 'timesheet' | 'despesas'
  status: 'pendente' | 'pago';
}

export interface HonorarioInputItensType {
  id: number
  tipo: "despesas" | "timesheet",
  valor: number
}

export interface HonorarioInput {
  processoId: number,
  clienteId: number,
  colaboradorId: number,
  custo: number,
  status: "pendente" | 'pago',
  tipoHonorario: 'timesheet' | 'despesas',
  items: HonorarioInputItensType[]
  horas?: number,
}

export interface IFaturaItems {
  id: number,
  processo_factura_id: number,
  processos_timesheet_id: number | null,
  horas: number | null,
  custo: number,
  dados_adicionais: string | null,
  created_at: string
  updated_at: string
  tipo: 'timesheet' | 'despesas',
  tipo_id: number
  tipoDespesa: string
}

export interface IFatura {
  processo_facturacao_id: number,
  processo_id: number,
  processo_horas: string | null,
  processo_custo: string,
  processo_facturacao_estado: string,
  processo_facturacao_data_registo: string,
  processo_ref: string,
  processo_n_processo_judicial: string | null,
  processo_assunto: string,
  processo_valor_total: string,
  processo_horas_mes: string,
  processo_modo_facturacao: string,
  processo_estado: string,
  cliente: string,
  clienteNIF: string,
  clienteContato: string,
  clienteEndereco: string,
  colaborador: string,
  stadus: string,
  items: IFaturaItems[] | []
}

export interface IHonorarioInvoiceItems {
    id: number,
    processo_factura_id: number,
    custo: number,
    dados_adicionais: string | null,
    created_at: string,
    updated_at: string,
    tipo: "timesheet" | "despesas",
    tipo_id: number,
    descricao: string,
    tarefa: string,
    colaborador: string,
    colaboradorTaxa: number,
    processos_timesheet_id?: number| null,
    horas?: string | null,
    data_registo: string
    tipoDespesa?: string | null
    dataRegistoTimeSheet?: string | null
}
export interface IHonorarioInvoicePayments {
    id: number,
}

export interface IHonorarioInvoice {
    processo_factura_id: number,
    processo_factura_horas: string | null,
    tipo_honorario: "timesheet" | "despesas",
    status: string,
    processo_factura_custo: string,
    processo_referencia: string,
    processo_n_processo_judicial: string,
    processo_modo_facturacao: "Avença",
    processo_estado: string,
    cliente: string,
    clienteNif: string,
    clienteContacto: string,
    colaborador: string,
    processo_factura_data_registo: string,
    items: IHonorarioInvoiceItems[],
    peyments: IHonorarioInvoicePayments[]
}
