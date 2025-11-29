import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ReactNode } from "react";
import type { IHonorarios } from "../../schema/InterfaceHonorarios";
import { converterHorasDecimais, convertMoeda } from "../../utils/data";

export const columns = [
  { id: 'id', label: '#' },
  { id: 'data_registo', label: 'Data Registo' },
  { id: 'tipo_honorario', label: 'Tipo' },
  { id: 'custo', label: 'Custo' },
  /* { id: 'data', label: 'Data' }, */
  { id: 'cliente', label: 'Cliente' },
  { id: 'ref', label: 'Ref. Processo' },
  { id: 'status', label: 'Estado' },
  { id: 'actions', label: 'Acções' }
];

export type IHonorarioRow = Pick<
IHonorarios,
  | "processo_factura_item_id"
  | "tarefa"
  | "processo_factura_horas"
  | "processo_factura_custo"
  | "cliente"
  | "colaborador"
  | "data_registo_timesheet"
  | "processo_estado"
  | "processo_factura_data_registo"
  | "status"
  | "tipo_honorario"
> & {
  actions: ReactNode; 
};

export const transformDataHonorarios = (
  data: IHonorarios[],
  onView: (honorario: IHonorarios) => void
): IHonorarioRow[] => {

  return data.map((honorario, index) => ({
    id: index + 1,
    tipo_honorario: honorario.tipo_honorario.charAt(0).toUpperCase() + honorario.tipo_honorario.slice(1),
    data_registo: honorario.processo_factura_data_registo.substring(0, 10),
    custo: convertMoeda(honorario.processo_factura_custo),
    cliente: honorario.cliente,
   //  data: honorario.data_registo_timesheet,
    ref: honorario.processo_referencia,
    colaborador: honorario.colaborador ?? null,
    
    status: (
      <span
      style={{
        color: honorario.status === 'pendente' ? '#FFA500' : honorario.status === 'pago' ? '#4CAF50' : '#9e9e9e',
        fontWeight: 600,
        textTransform: "capitalize"
      }}
    >
      {honorario.status ?? "pendente"}
    </span>
      ),
    actions: (
      <>
        <IconButton
          color="secondary"
          onClick={() => onView(honorario)}
          size="small"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>
      </>
    ),
  }));
};
