

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
  clienteId: number
  valor: number
  tipoDespesaId: number,
  dataMovimento: string
  colaboradorId: number
  numeroProcesso: string
  nomeCliente: string
  colaborador: string
  tipoDespesasLabel: string
  tipoDespesas: string
  criadaEm: string
  tipoMovimento?: number,
  status: string
}

export interface IDespesasInput {
  processoId: string
  valor: number
  dataMovimento: string
  colaboradorId: number
  clienteId: number
  tipoDespesaId: number
}