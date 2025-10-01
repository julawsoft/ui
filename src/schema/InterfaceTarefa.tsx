

export interface ITarefa {
  id: number;
  descricao: string;
  processo_id: number;
  data_para_realizacao: string;
  status: string;
  colaborador_id: number;
  gestor_id: number;
  data_realizada: string | null;
  data_aprovada: string | null;
  created_at: string | null;
  updated_at: string | null;
}
