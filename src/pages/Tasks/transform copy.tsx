import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ReactNode } from "react";
import type { IHonorarios } from "../../schema/InterfaceHonorarios";
import { converterHorasDecimais, convertMoeda } from "../../utils/data";
import type { ITasks } from "../../schema/InterfaceTarefa";

export const columnsColaborador = [
  { id: 'id', label: '#' },
  { id: 'tarefa', label: 'Tarefa' },
  { id: 'tipo', label: 'Tipo' },
  { id: 'data_para_realizacao', label: 'Prazo'},
  { id: 'dias_restantes', label: 'Dias Restantes'},
  { id: 'estado', label: 'Estado'},
  { id: 'ref', label: 'Ref. Processo' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'supervidor', label: 'Supervisor' },
  { id: 'data_registo', label: 'Data Registo' },
  { id: 'data_realizada', label: 'Data Realizada' },
  { id: 'data_aprovada', label: 'Data Aprovada' },
  { id: 'actions', label: 'Acções' }
];

export type ITasksRow = Pick<
ITasks,
  | "id"
  | "ref"
  | "descricao"
  | "assunto"
  | "colaborador"
  | "dias_em_falta"
  | "estado"
  | "gestor"
  | "cliente"
  | "tipoTarefa"
  | "data_criada"
  | "data_para_realizacao"
  | "data_realizada"
  | "data_aprovada"
> & {
  actions: ReactNode; 
};

export const transformDataTasksColaborador = (
  data: ITasks[],
  onEdit: (task: ITasks) => void,
  onView: (task: ITasks) => void,
  onChange: (task: ITasks) => void
): ITasksRow[] => {

  return data.map((task, index) => ({
    id: index + 1,
    tarefa: task,
    tipo: task ,
    data_para_realizacao: task     ,
    dias_restantes: task ,
    estado: task     ,
    ref: task ,
    cliente: task ,
    supervidor: task ,
    data_registo: task ,
    data_realizada: task ,
    data_aprovada: task ,
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => onEdit(task)}
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => onView(task)}
          size="small"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => onChange(task)}
          size="small"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  }));
};
