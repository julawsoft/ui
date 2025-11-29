import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, type ReactNode } from "react";
import type { IColaborador } from "../../schema/InterfaceColaboradores";
import type { ITimeSheets, ITotalProjects, ITotalTasks } from "../../schema/InterfaceTimeSheets";
import { converterHorasDecimais } from "../../utils/data";
import type { ITarefa } from "../../schema/InterfaceProcess";
import { CheckBox, Remove } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";

/** 🎨 Cores dos estados */
const estadoColors: Record<string, string> = {
  rascunho: "#9e9e9e",    // cinza
  submetido: "#2196f3",   // azul
  aprovado: "#4caf50",    // verde
  rejeitado: "#f44336",   // vermelho
  faturado: "#ff9800"     // laranja
};

/** 🔧 Função utilitária segura para datas */
const formatDate = (dateStr?: string | null) => {
  return dateStr?.substring(0, 10)
  console.log("a data que chega", dateStr)
  if (!dateStr) return "-";
  const parsed = dayjs(dateStr, ["DD/MM/YYYY HH:mm:ss", "YYYY-MM-DDTHH:mm:ssZ"], true);
  return parsed.isValid() ? parsed.format("DD/MM/YYYY") : "-";
};

/** TAREFAS */
export const columnsTarefas = [
  { id: "id", label: "#" },
  { id: "tarefa", label: "Tarefas" },
  { id: "janeiro", label: "Janeiro" },
  { id: "fevereiro", label: "Fevereiro" },
  { id: "marco", label: "Março" },
  { id: "abril", label: "Abril" },
  { id: "maio", label: "Maio" },
  { id: "junho", label: "Junho" },
  { id: "julho", label: "Julho" },
  { id: "agosto", label: "Agosto" },
  { id: "setembro", label: "Setembro" },
  { id: "outubro", label: "Outubro" },
  { id: "novembro", label: "Novembro" },
  { id: "dezembro", label: "Dezembro" },
  { id: "total", label: "Total" }
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
  { id: "id", label: "#" },
  { id: "processos", label: "Processo Ref." },
  { id: "janeiro", label: "Janeiro" },
  { id: "fevereiro", label: "Fevereiro" },
  { id: "marco", label: "Março" },
  { id: "abril", label: "Abril" },
  { id: "maio", label: "Maio" },
  { id: "junho", label: "Junho" },
  { id: "julho", label: "Julho" },
  { id: "agosto", label: "Agosto" },
  { id: "setembro", label: "Setembro" },
  { id: "outubro", label: "Outubro" },
  { id: "novembro", label: "Novembro" },
  { id: "dezembro", label: "Dezembro" },
  { id: "total", label: "Total" }
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
    total: timesheet.Total
  }));
};

/** TIMESHEETS */
export const columns = [
  { id: "id", label: "#" },
  { id: "data_inicio", label: "Data" },
  { id: "tarefa", label: "Tarefa" },
  { id: "horas", label: "Total Horas" },
  { id: "cliente", label: "Cliente" },
  { id: "referencia_processo", label: "Ref. Processo" },
  { id: "assunto_processo", label: "Assunto Processo" },
  { id: "status", label: "Estado" },
  { id: "actions", label: "Acções" }
];

export type ITimeSheetsRow = Pick<
  ITimeSheets,
  | "id"
  | "referencia_processo"
  | "assunto_processo"
  | "tarefa"
  | "cliente"
  | "data_inicio"
  | "horas"
  | "status"
> & {
  actions: ReactNode;
};

export const transformDataTimeSheet = (
  data: ITimeSheets[],
  onEdit: (timesheet: ITimeSheets) => void,
  onView: (timesheet: ITimeSheets) => void,
  onRemove: (timesheet: ITimeSheets) => void,
  onChange: (timesheet: ITimeSheets) => void
): ITimeSheetsRow[] => {
  return data.map((timesheet, index) => {
    const estado = timesheet.status?.toLowerCase() ?? "rascunho";
    const estadoColor = estadoColors[estado] || "#9e9e9e";

    return {
      id: index + 1,
      referencia_processo: timesheet.referencia_processo ?? "-",
      assunto_processo: timesheet.assunto_processo ?? "-",
      tarefa: timesheet.tarefa ?? "-",
      cliente: timesheet.cliente ?? "-",
      status: (
        <span
          style={{
            color: estadoColor,
            fontWeight: 600,
            textTransform: "capitalize"
          }}
        >
          {timesheet.status ?? "Rascunho"}
        </span>
      ),
      data_inicio: formatDate(timesheet.data_inicio),
      horas: timesheet.horas,
      actions: (
        <ActionsMenu
          timesheet={timesheet}
          onEdit={onEdit}
          onView={onRemove}
          onChange={onChange}
        />
      )
    };
  });
};

/** MENU DE AÇÕES */
const ActionsMenu: React.FC<{
  timesheet: ITimeSheets;
  onEdit: (timesheet: ITimeSheets) => void;
  onView: (timesheet: ITimeSheets) => void;
  onChange: (timesheet: ITimeSheets) => void;
}> = ({ timesheet, onEdit, onView, onChange }) => {
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
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit(timesheet);
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onView(timesheet);
          }}
        >
          <ListItemIcon>
            <Remove fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Eliminar" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onChange(timesheet);
          }}
        >
          <ListItemIcon>
            <CheckBox fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Submeter" />
        </MenuItem>
      </Menu>
    </>
  );
};
