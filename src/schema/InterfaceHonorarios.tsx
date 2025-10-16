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
  processo_factura_item_id: number;
  processo_factura_item_horas: string;
  processo_factura_item_custo: string;
  data_registo_timesheet: string;
  tarefa: string;
  processo_referencia: string;
  processo_n_processo_judicial: string | null;
  processo_modo_facturacao: string;
  processo_estado: string;
  cliente: string;
  colaborador: string;
  processo_factura_item_data_registo: string;
}
