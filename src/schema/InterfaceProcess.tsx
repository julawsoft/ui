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

export interface IProcesso {
  id: number;
  ref: string;
  assunto: string;
  area: string;
  fase: string;
  instituicao: string;
  modo_facturacao: string;
  gestor: string;
  cliente: string;
  tipo_cliente: string;
  contra_parte: string;
  data_registo: string;
  estado: string;
  horas_mes?: string | null;
  valor_total?: number | null;
  tarefas: ITarefa[];
  equipas: IEquipa[];
  anexos: IAnexo[];
}


export interface IProcessoInput {
  id: number;
  ref: string;
  assunto: string;
  area: string;
  fase: string;
  instituicao: string;
  modo_facturacao: string;
  gestor: string;
  cliente: string;
  tipo_cliente: string;
  contra_parte: string;
  data_registo: string;
  estado: string;
  horas_mes?: string | null;
  valor_total?: number | null;
}