import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { ReactNode } from "react";
import type { IDespesas } from "../../schema/interfaceDespesas";


export const columns = [
  { id: 'id', label: '#' },
  { id: 'num_precesso', label: 'N.º Processo' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'valor', label: 'Valor' },
  { id: 'tipo_despesa', label: 'Tipo Despesas' },
  { id: 'status', label: 'Estado' },
  { id: 'criada_em', label: 'Data Registo' },
  { id: 'actions', label: 'Acções' }
];

const estadoColors: Record<string, string> = {
  'pendente': '#ff9800',
  faturado: '#4caf50',
};

export type IDespesasRow = Pick<
  IDespesas,
  | "id"
  | "valor"
  | "numeroProcesso"
  | "nomeCliente"
  | "colaborador"
  | "tipoDespesas"
  | "criadaEm"
  | "status"
> & {
  actions: ReactNode;         // botões de ação
};

export const transformDataDespesas = (
  data: IDespesas[],
  onEdit: (despesas: IDespesas) => void,
): any[] => {
  return data.map((despesas, index) => ({
    id: index + 1,
    num_precesso: despesas.numeroProcesso,
    cliente: despesas.nomeCliente,
    valor: despesas.valor,
    tipo_despesa: despesas.tipoDespesas,
    colaborador: despesas.colaborador,
    status: (
      <span style={{ color: estadoColors[despesas.status], fontWeight: 600 }}>
        {despesas.status.toString().charAt(0).toUpperCase() + despesas.status.toString().slice(1)}
      </span>
    ),
    criada_em: despesas.criadaEm,
    actions: (
      <>
        {
          despesas.status.toString().toLowerCase() === 'pendente' ? (
            <IconButton
            color="primary"
            title="Alterar Despesa"
            onClick={() => onEdit(despesas)}
            size="small"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          ) : (
              null
          )
        }
      
      </>
    ),
  }));
};
