import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ReactNode } from "react";
import type { IHonorarios } from "../../schema/InterfaceHonorarios";
import { converterHorasDecimais, convertMoeda } from "../../utils/data";

export const columns = [
  { id: 'id', label: '#' },
  { id: 'tarefa', label: 'Tarefa' },
  { id: 'horas', label: 'Horas' },
  { id: 'custo', label: 'Custo' },
  /* { id: 'data', label: 'Data' }, */
  { id: 'cliente', label: 'Cliente' },
  { id: 'ref', label: 'Ref. Processo' },
  { id: 'colaborador', label: 'Colaborador'},
 /* { id: 'status', label: 'Estado' },*/
  { id: 'data_registo', label: 'Data Registo' },
  { id: 'actions', label: 'Acções' }
];

export type IHonorarioRow = Pick<
IHonorarios,
  | "processo_factura_item_id"
  | "tarefa"
  | "processo_factura_item_horas"
  | "processo_factura_item_custo"
  | "cliente"
  | "colaborador"
  | "data_registo_timesheet"
  | "processo_estado"
  | "processo_factura_item_data_registo"
> & {
  actions: ReactNode; 
};

export const transformDataHonorarios = (
  data: IHonorarios[],
  onEdit: (honorario: IHonorarios) => void,
  onView: (honorario: IHonorarios) => void
): IHonorarioRow[] => {

  return data.map((honorario, index) => ({
    id: index + 1,
    tarefa: honorario.tarefa,
    horas: converterHorasDecimais(honorario.processo_factura_item_horas),
    custo: convertMoeda(honorario.processo_factura_item_custo),
    cliente: honorario.cliente,
   //  data: honorario.data_registo_timesheet,
    ref: honorario.processo_referencia,
    colaborador: honorario.colaborador ?? null,
    // status: honorario.processo_estado,
    data_registo: honorario.processo_factura_item_data_registo,
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => onEdit(honorario)}
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
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
