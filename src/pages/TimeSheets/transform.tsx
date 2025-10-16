import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { ReactNode } from "react";
import type { IColaborador } from "../../schema/InterfaceColaboradores";
import type { ITimeSheets, ITotalProjects, ITotalTasks } from "../../schema/InterfaceTimeSheets";
import { converterHorasDecimais } from '../../utils/data'


/** TAREFAS */

export const columnsTarefas = [
  { id: 'id', label: '#' },
  { id: 'tarefa', label: 'Tarefas' },
  { id: 'janeiro', label: 'Janeiro' },
  { id: 'fevereiro', label: 'Fevereiro' },
  { id: 'marco', label: 'Março' },
  { id: 'abril', label: 'Abril' },
  { id: 'maio', label: 'Maio' },
  { id: 'junho', label: 'Junho' },
  { id: 'julho', label: 'Julho' },
  { id: 'agosto', label: 'Agosto' },
  { id: 'setembro', label: 'Setembro' },
  { id: 'outubro', label: 'Outubro' },
  { id: 'novembro', label: 'Novembro' },
  { id: 'dezembro', label: 'Dezembro' },
  { id: 'total', label: 'Total' }
];


export const transformDataTimeSheetTarefas = (
  data: ITotalTasks[],
  onEdit: (timesheet: ITotalTasks) => void,
  onView: (timesheet: ITotalTasks) => void
): ITotalTasks[] => {
  return data.map((timesheet, index) => ({
    id: index + 1,
    tarefa: timesheet.Tarefa,
    janeiro: timesheet.Janeiro,
    fevereiro: timesheet.Fevereiro,
    marco: timesheet.Março,
    abril: timesheet.Abril,
    maio: timesheet.Maio,
    junho: timesheet.Junho,
    julho: timesheet.Julho,
    agosto: timesheet.Agosto,
    setembro: timesheet.Setembro,
    outubro: timesheet.Outubro,
    novembro: timesheet.Novembro,
    dezembro: timesheet.Dezembro,
    total: timesheet.Total
  }));
};


/** PROJECTOS */

export const columnsProjectos = [
  { id: 'id', label: '#' },
  { id: 'projectos', label: 'Projecto Ref.' },
  { id: 'janeiro', label: 'Janeiro' },
  { id: 'fevereiro', label: 'Fevereiro' },
  { id: 'marco', label: 'Março' },
  { id: 'abril', label: 'Abril' },
  { id: 'maio', label: 'Maio' },
  { id: 'junho', label: 'Junho' },
  { id: 'julho', label: 'Julho' },
  { id: 'agosto', label: 'Agosto' },
  { id: 'setembro', label: 'Setembro' },
  { id: 'outubro', label: 'Outubro' },
  { id: 'novembro', label: 'Novembro' },
  { id: 'dezembro', label: 'Dezembro' },
  { id: 'total', label: 'Total' }
];

export const transformDataTimeSheetProjectos = (
  data: ITotalProjects[],
  onEdit: (timesheet: ITotalProjects) => void,
  onView: (timesheet: ITotalProjects) => void
): ITotalProjects[] => {
  return data.map((timesheet, index) => ({
    id: index + 1,
    projectos: timesheet.processo_referencia,
    janeiro: timesheet.Janeiro,
    fevereiro: timesheet.Fevereiro,
    marco: timesheet.Março,
    abril: timesheet.Abril,
    maio: timesheet.Maio,
    junho: timesheet.Junho,
    julho: timesheet.Julho,
    agosto: timesheet.Agosto,
    setembro: timesheet.Setembro,
    outubro: timesheet.Outubro,
    novembro: timesheet.Novembro,
    dezembro: timesheet.Dezembro,
    total: timesheet.Total,
  }));
};



/** TimeSheets  */
export const columns = [
  { id: 'id', label: '#' },
  { id: 'data_inicio', label: 'Data' },
  { id: 'tipo_evento', label: 'Tarefa' },
  { id: 'horas', label: 'Total Horas' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'referencia_processo', label: 'Ref. Processo' },
  { id: 'assunto_processo', label: 'Assunto Processo' },
  /*{ id: 'data_registo', label: 'Data Registo' },*/
  { id: 'actions', label: 'Acções' }
];

export type ITimeSheetsRow = Pick<
  ITimeSheets,
  | "id"
  | "referencia_processo"
  | "assunto_processo"
  | "tipo_evento"
  | "cliente"
  | "data_inicio"
  | "horas"
/*| "data_registo" */
> & {
  actions: ReactNode;         // botões de ação
};

export const transformDataTimeSheet = (
  data: ITimeSheets[],
  onEdit: (timesheet: ITimeSheets) => void,
  onView: (timesheet: ITimeSheets) => void
): ITimeSheetsRow[] => {
  return data.map((timesheet, index) => ({
    id: index + 1,
    referencia_processo: timesheet.referencia_processo,
    assunto_processo: timesheet.assunto_processo,
    tipo_evento: timesheet.tipo_evento,
    cliente: timesheet.cliente,
    data_inicio: (
      `${timesheet.data_inicio.substring(0, 10)}`
    ),
    horas: (
      converterHorasDecimais(timesheet.horas)
    ),
    /* data_registo: timesheet.data_registo,*/
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => onEdit(timesheet)}
          size="small"
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
        {/*} <IconButton
          color="secondary"
          onClick={() => onView(timesheet)}
          size="small"
        >
          <VisibilityIcon fontSize="inherit" />
        </IconButton>*/}
      </>
    ),
  }));
};
