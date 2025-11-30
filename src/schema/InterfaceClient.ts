

export interface IClient {
  id: number;
  denominacao: string
  tipo_id: number
  nif: String,
  endereco: String
  pessoa_contacto: String
  contacto_cobranca: number
  e_mail: string
  uuid: string
  nota: string
  status: string,
  created_at: string
  updated_at: string
  tipo: {
    id: number,
    description: string
    code: string | null,
    created_at: string
    updated_at: string
  }
}


export interface IClientInput {
  id: number;
  denominacao: string
  tipo_id: number
  nif: String,
  endereco: String
  pessoa_contacto: String
  contacto_cobranca: number
  e_mail: string
  uuid: string
  nota: string
  status: string,
  created_at: string
  updated_at: string
  tipo: {
    id: number,
    description: string
    code: string | null,
    created_at: string
    updated_at: string
  }
}


