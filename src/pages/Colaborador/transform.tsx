import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ReactNode } from "react";
import type { IColaborador } from "../../schema/InterfaceColaboradores";



export const columns = [
  { id: 'id', label: '#' },
  { id: 'colaborador', label: 'Colaborador' },
  { id: 'contacto_pessoal', label: 'Contato Pessoal' },
  { id: 'email_corporativo', label: 'E-mail Corporativo' },
  { id: 'tipoColaborador', label: 'Tipo' },
  { id: 'categoria', label: 'Categoria' },
  { id: 'actions', label: 'Acções' }
];

export type IColaboradorRow = Pick<
  IColaborador,
  | "id"
  | "funcao"
  | "contacto_pessoal"
  | "email_pessoal"
  | "email_corporativo"
  | "n_identificacao"
  | "n_cedula_ordem"
  | "tipoColaborador"
  | "categoria"
  | "status"
> & {
  colaborador: string | null;
  actions: ReactNode;         // botões de ação
};

export const transformDataColaborador = (
  data: IColaborador[],
  onEdit: (colaborador: IColaborador) => void,
  onView: (colaborador: IColaborador) => void
): IColaboradorRow[] => {
  return data.map((colaborador) => ({
    id: colaborador.id,
    colaborador: colaborador.nome_completo,
    funcao: colaborador.funcao,
    contacto_pessoal: colaborador.contacto_pessoal,
    email_pessoal: colaborador.email_pessoal,
    email_corporativo: colaborador.email_corporativo,
    n_identificacao: colaborador.n_identificacao,
    n_cedula_ordem: colaborador.n_cedula_ordem,
    tipoColaborador: colaborador.tipoColaborador ?? null,
    categoria: colaborador.categoria ?? null,
    status: colaborador.status,
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => onEdit(colaborador)}
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => onView(colaborador)}
          size="small"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  }));
};
