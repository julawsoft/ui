import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ReactNode } from "react";
import type { IColaborador } from "../../schema/InterfaceColaboradores";
import type { IDespesas } from "../../schema/interfaceDespesas";



export const columns = [
  { id: 'id', label: '#' },
  { id: 'num_precesso', label: 'N.º Processo' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'valor', label: 'Valor' },
  { id: 'tipo_despesa', label: 'Tipo Despesas' },
  { id: 'criada_em', label: 'Data Registo' },
  { id: 'actions', label: 'Acções' }
];

export type IDespesasRow = Pick<
  IDespesas,
  | "id"
  | "valor"
  | "numeroProcesso"
  | "nomeCliente"
  | "colaborador"
  | "tipoDespesas"
  | "criadaEm"
> & {
  actions: ReactNode;         // botões de ação
};

export const transformDataDespesas = (
  data: IDespesas[],
  onEdit: (despesas: IDespesas) => void,
): IDespesasRow[] => {
  return data.map((despesas) => ({
    id: despesas.id,
    num_precesso: despesas.numeroProcesso,
    cliente: despesas.nomeCliente,
    valor: despesas.valor,
    tipo_despesa: despesas.tipoDespesas,
    colaborador: despesas.colaborador,
    criada_em: despesas.criadaEm,
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => onEdit(despesas)}
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  }));
};
