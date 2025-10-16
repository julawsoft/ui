import type { StringValidation } from "zod/v3"

export interface ITimeSheets {
  id: number
  referencia_processo: string
  assunto_processo: string
  dados_importantes: string
  data_inicio: string,
  data_fim: string,
  horas: string,
  descricao: string,
  tipo_evento: string,
  modo_facturacao: string,
  tipo_cliente: string,
  colaborador: string
  data_registo: string
  cliente: number,
  colaborador_id: number,
}


export interface ITipoTarefas {
  id: number,
  label: string
  descricao: string
}


export interface ITimeSheetNotInvoice {
  referencia_processo: string
  assunto_processo: string
  processoId: number
  dados_importantes: string
  data_inicio: string
  data_fim: string
  horas: string,
  descricao: string,
  tipo_evento: string,
  modo_facturacao: string | null,
  clienteId: number
  cliente: string
  tipo_cliente: string
  colaborador: string
}


export interface ITotalProjects {
  processo_referencia: string,
  Janeiro: string,
  Fevereiro: string,
  Março: string,
  Abril: string,
  Maio: string,
  Junho: string,
  Julho: string,
  Agosto: string,
  Setembro: string,
  Outubro: string,
  Novembro: string,
  Dezembro: string,
  Total: string
}
export interface ITotalTasks {
  Tarefa: string,
  Janeiro: string,
  Fevereiro: string,
  Março: string,
  Abril: string,
  Maio: string,
  Junho: string,
  Julho: string,
  Agosto: string,
  Setembro: string,
  Outubro: string,
  Novembro: string,
  Dezembro: string,
  Total: string
}