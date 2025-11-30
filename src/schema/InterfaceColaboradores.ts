

export interface IColaborador {
  id: number;
  nome_completo: string | null;
  nome_profissional: string | null;
  inicial?: string | null; // não veio também
  funcao: string | null;
  tipo_colaborador_id: number;
  data_nascimento: string | null;
  token_reset?: string | null;
  uuid?: string;
  taxa_horaria: string;
  status: 'active' | 'inactive' | string;
  contacto_pessoal: string | null;
  contacto_emergencia: string | null;
  n_identificacao: string | null;
  n_cedula_ordem: string | null;
  email_pessoal: string | null;
  email_corporativo: string | null;
  categoria_id?: number;
  tipoColaborador?: string | null; // novo campo
  categoria?: string | null; // novo campo
  created_at?: string;
  updated_at?: string;
}

export interface IColaboradorInput {
  nomeCompleto: string;
  nomeProfissional: string;
  funcao: string;
  tipoColaboradorId: number;
  categoriaId: number;
  dataNascimento: string;
  taxaHoraria: number | null;
  status: 'active' | 'inactive' | string;
  contactoPessoal: number | null;
  contactoEmergencia: number | null;
  nIdentificacao: string | null;
  nCedulaOrdem: string | null;
  emailPessoal: string | null;
  emailCorporativo: string | null;
  userName: string | null;
  inicial?: string | null;
  id?: string
}



export interface ITipoColaborador {
  id: number,
  description: string
}
export interface ITipoColaboradorInput {
  description: string
}


export interface ICategoriaColaboradorInput {
  descricao: string
}
export interface ICategoriaColaborador {
  id: number,
  descricao: string
}