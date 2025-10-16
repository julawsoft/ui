// interfaces/processo.ts
export interface ITarefa {
  id: number;
  descricao: string;
  processo_id: number;
  data_para_realizacao: string;
  status: string;
  colaborador_id: number;
  gestor_id?: number | null;
  data_realizada?: string | null;
  data_aprovada?: string | null;
}

export interface IEquipa {
  id: number;
  processo_id: number;
  colaborador_id: number;
  colaborador: string;
  funcao: string;
  colaborador_tipo: string;
}

export interface IAnexo {
  id: number;
  processo_id: number;
  descricao: string;
  path: string;
  colaborador: string;
  funcao: string;
  colaborador_tipo: string;
}

export interface IProcessoModoFacturacao {
  id: number;
  descricao: number;
  is_payment: number
  is_unique_payment: number
  created_at: string
}

export interface IProcessoStatus {
  id: number,
  descricao: string
}

export interface IProcessoInstituicoes{
  id: number,
  descricao: string
}

// src/schema/InterfaceProcesso.ts

export interface IProcesso {
  id: number;
  ref: string;
  assunto: string;
  area: string;
  fase: string;
  instituicao_id: number | null;
  modo_facturacao_id: number | null;
  gestor_id: number | null;
  cliente_id: number | null;
  contra_parte: string | null;
  data_registo: string;
  data_suspensao: string | null;
  colaborador_id_suspendeu: number | null;
  data_encerramento: string | null;
  colaborador_id_encerrou: number | null;
  metodologia: string | null;
  estrategia: string | null;
  factos: string | null;
  objectivos: string | null;
  dados_importantes: string | null;
  horas_mes: string | null;
  valor_total: number | null;
  data_emissao_factura: string | null;
  status_id: number;
  created_at: string;
  updated_at: string;
  n_processo_judicial: string | null;
  estado: string;  
  // Relacionamentos
  instituicao: string | null;
  gestor: any | null; // Se houver interface de colaborador, pode substituir por IColaborador
  colaborador_suspendeu: any | null;
  colaborador_encerrou: any | null;
  cliente: any | null; // Se houver interface de cliente, pode substituir por IClient
  tipo_cliente: any | null;
  
  // Arrays
  modo_facturacao: IProcessoModoFacturacao;
  tarefas: any[]; // Pode substituir por interface ITarefa
  precedentes: any[]; // Pode substituir por interface IPrecedente
  equipas: any[]; // Pode substituir por interface IEquipe
  anexos: any[]; // Pode substituir por interface IAnexo
}



export interface IProcessoInput {
  assunto: string;
  area: string;
  fase: string;
  instituicaoId: number;
  modoFacturacaoId: number;
  gestorId: number;
  contraParte: string;
  dataRegisto: string;
  statusId: number;
  clienteId?: number;
  horasMes?: string | null;
  valorTotal?: number | null;
  nProcessoJudicial?: string;
}