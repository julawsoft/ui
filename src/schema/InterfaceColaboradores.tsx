

export interface IColaborador {
  id: number;
  nome_completo: string | null;
  nome_profissional: string | null;
  inicial?: string | null; // não veio também
  funcao: string | null;
  tipo_colaborador_id: number | null;
  data_nascimento: string | null;
  token_reset?: string | null;
  uuid?: string;
  taxa_horaria: number | null;
  status: 'active' | 'inactive' | string;
  contacto_pessoal: number | null;
  contacto_emergencia: number | null;
  n_identificacao: string | null;
  n_cedula_ordem: string | null;
  email_pessoal: string | null;
  email_corporativo: string | null;
  categoria_id?: number | null;
  tipoColaborador?: string | null; // novo campo
  categoria?: string | null; // novo campo
  created_at?: string;
  updated_at?: string;
}



export interface IColaboradorInput {
  nome_completo: string | null;
  nome_profissional: string | null;
  inicial?: string | null; // não veio também
  funcao: string | null;
  tipo_colaborador_id: number | null;
  data_nascimento: string | null;
  token_reset?: string | null;
  uuid?: string;
  taxa_horaria: number | null;
  status: 'active' | 'inactive' | string;
  contacto_pessoal: number | null;
  contacto_emergencia: number | null;
  n_identificacao: string | null;
  n_cedula_ordem: string | null;
  email_pessoal: string | null;
  email_corporativo: string | null;
  categoria_id?: number | null;
  tipoColaborador?: string | null; // novo campo
  categoria?: string | null; // novo campo
  created_at?: string;
  updated_at?: string;
}
