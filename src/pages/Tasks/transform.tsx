import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import type { ReactNode } from "react";
import type { ITasks } from "../../schema/InterfaceTarefa";
import { CheckBox, Remove } from "@mui/icons-material";

// Colunas da tabela
export const columnsColaborador = [
  { id: 'id', label: '#' },
  { id: 'tarefa', label: 'Tarefa' },
  { id: 'tipo', label: 'Tipo' },
  { id: 'data_para_realizacao', label: 'Prazo' },
  { id: 'dias_restantes', label: 'Dias Restantes' },
  { id: 'estado', label: 'Estado' },
  { id: 'ref', label: 'Ref. Processo' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'data_registo', label: 'Data Registo' },
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

// Menu de ações
const ActionsMenu: React.FC<{
  task: ITasks;
  onEdit: (task: ITasks) => void;
  onView: (task: ITasks) => void;
  onChange: (task: ITasks) => void;
}> = ({ task, onEdit, onView, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => { handleClose(); onEdit(task); }}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Editar" />
        </MenuItem>

        <MenuItem onClick={() => { handleClose(); onView(task); }}>
          <ListItemIcon><Remove fontSize="small" /></ListItemIcon>
          <ListItemText primary="Eliminar" />
        </MenuItem>

        <MenuItem onClick={() => { handleClose(); onChange(task); }}>
          <ListItemIcon><CheckBox fontSize="small" /></ListItemIcon>
          <ListItemText primary="Concluir tarefas" />
        </MenuItem>
      </Menu>
    </>
  );
};

// Cores dos estados (igual ao calendário)
const estadoColors: Record<string, string> = {
  Criada: '#2196f3',
  'Em Progresso': '#ff9800',
  Concluída: '#4caf50',
};

// Transformação de dados para a tabela
export const transformDataTasksColaborador = (
  data: ITasks[],
  onEdit: (task: ITasks) => void,
  onRemove: (task: ITasks) => void,
  onChange: (task: ITasks) => void
): ITasksRow[] => {
  return data.map((task, index) => {
    // Cor do estado
    const estadoColor = estadoColors[task.estado ?? 'Criada'] || '#1976d2';

    // Dias restantes coloridos (somente se não estiver concluída)
    let diasRestantesContent: React.ReactNode = '-';
    // if (task.estado?.toLowerCase() !== 'criada' && task.estado?.toLowerCase() !== 'concluída') {
    if (task.estado?.toLowerCase() !== 'concluída') {
      const dias = Number(task.dias_em_falta ?? 0);
      let diasColor = '#4caf50'; // verde padrão

      if (dias <= 7) diasColor = '#f44336'; // vermelho
      else if (dias <= 20) diasColor = '#ff9800'; // laranja

      diasRestantesContent = (
        <span style={{ color: diasColor, fontWeight: 500 }}>{dias}</span>
      );
    }

    return {
      id: index + 1,
      tarefa: task.descricao,
      tipo: task.tipoTarefa,
      data_para_realizacao: task.data_para_realizacao?.toString().substring(0, 10) ?? '-',
      dias_restantes: diasRestantesContent,
      estado: (
        <span style={{ color: estadoColor, fontWeight: 600 }}>
          {task.estado}
        </span>
      ),
      ref: task.ref ?? '-',
      cliente: task.cliente ?? '-',
      data_registo: task.data_criada,
      actions: <ActionsMenu task={task} onEdit={onEdit} onView={onRemove} onChange={onChange} />,
    };
  });
};
