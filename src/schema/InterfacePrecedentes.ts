import type { IAnexo } from "./InterfaceAnexo";
import type { IEquipa } from "./InterfaceEquipa";
import type { ITarefa } from "./InterfaceProcess";

export type IProcessStatus = {
  Rascunho: "Rascunho";
  Proposta: "Proposta";
  Concluido: "Concluído";
  Suspenso: "Suspenso";
  Cancelado: "Cancelado";
};

export type IProcessModoFacturacao = {
  Avenca: "Avença";
  SuccessFee: "Success Fee";
  Fixo: "Fixo";
  Probono: "Probono";
};

export interface IPrecedentes {
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
  colaborador_id_suspendeu: string;
  data_encerramento: string;
  colaborador_id_encerrou: string;
  metodologia: string | null;
  estrategia: string | null;
  factos: string | null;
  objectivos: string | null;
  dados_importantes: string | null;
  horas_mes: number | null;
  valor_total: number | null;
  data_emissao_factura: string;
  status_id: number;
  created_at: string | null;
  updated_at: string | null;
  estado: IProcessStatus;
  instituicao: string | null;
  modo_facturacao: IProcessModoFacturacao;
  gestor: string | null;
  colaborador_suspendeu: number | null;
  colaborador_encerrou: number | null;
  cliente: string | null;
  tipo_cliente: string | null;
  tarefas: ITarefa[];
  precedentes: any[];
  equipas: IEquipa[];
  anexos: IAnexo[];
}
