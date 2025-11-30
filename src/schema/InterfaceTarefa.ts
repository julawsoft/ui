

export type ITasks = {
    id: number,
    ref: string,
    descricao: string,
    processo_id: number | null,
    assunto: string |null,
    gestor_id: number | null,
    colaborador: string,
    dias_em_falta: number,
    estado: string,
    gestor: string| null,
    cliente: string | null,
    tipoTarefa: string |null,
    data_criada: string,
    data_para_realizacao: string,
    data_realizada: null,
    data_aprovada: null
    cliente_id: number,
    colaborador_id: number,
    tipo_tarefa_id: number,
    status_id: string,
};

export type ITasksInput = {
  descricao: string,
  status: string,
  dataParaRealizacao: string,
  processoId: number | null,
  clienteId: number | null,
  gestorId: number | null,
  colaboradorId: number,
  tipoTarefaId: number |null,
};
