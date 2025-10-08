

export interface ITipoDespesas {
  id: number;
  label: string | null;
  descricao: string;
  created_at?: string;
  updated_at?: string;
}

export interface ITipoDespesasInput {
  label: string | null;
  descricao: string | null;
}


export interface IDespesas {
  id: number
  idProcesso: number
  valor: number
  dataMovimento: string
  colaboradorId: number
  numeroProcesso: string
  nomeCliente: string
  colaborador: string
  tipoDespesasLabel: string
  tipoDespesas: string
  criadaEm: string
  tipoMovimento?: number,
}

export interface IDespesasInput {
  processoId: string
  valor: number
  dataMovimento: string
  colaboradorId: number | undefined
  clienteId: number
  tipoDespesaId: number
}