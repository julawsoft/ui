import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState, type ReactNode } from "react";
import type { ITimeSheets, ITotalProjects, ITotalTasks } from "../../schema/InterfaceTimeSheets";
import { CheckBox } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dayjs from "dayjs";

const estadoColors: Record<string, string> = {
  rascunho: "#9e9e9e",    // cinza
  submetido: "#2196f3",   // azul
  aprovado: "#4caf50",    // verde
  rejeitado: "#f44336",   // vermelho
  faturado: "#ff9800"     // laranja
};

/** 🔧 Função utilitária segura para datas */
const formatDate = (dateStr?: string | null) => {
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
  data: ITotalTasks[]
): any[] => {
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
  data: ITotalProjects[]
): any[] => {
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

export const columns = [
  { id: "id", label: "#" },
  { id: "data_inicio", label: "Data" },
  { id: "tarefa", label: "Tarefa" },
  { id: "horas", label: "Total Horas" },
  { id: "colaborador", label: "Colaborador" },
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
  | "colaborador"
  | "status"
> & {
  actions: ReactNode;
};

export const transformDataTimeSheet = (
  data: ITimeSheets[],
  onChange: (timesheet: ITimeSheets) => void
): any[] => {
  return data.map((timesheet, index) => {
    const estado = timesheet.status?.toLowerCase() ?? "rascunho";
    const estadoColor = estadoColors[estado] || "#9e9e9e";

    return {
      id: index + 1,
      referencia_processo: timesheet.referencia_processo ?? "-",
      assunto_processo: timesheet.assunto_processo ?? "-",
      tarefa: timesheet.tarefa ?? "-",
      colaborador: timesheet.colaborador ?? "-",
      cliente: typeof timesheet.cliente === "number" ? timesheet.cliente : undefined,
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
          onChange={onChange}
          status={timesheet.status}
        />
      )
    };
  });
};

/** MENU DE AÇÕES */
const ActionsMenu: React.FC<{
  timesheet: ITimeSheets;
  onChange: (timesheet: ITimeSheets) => void;
  status: string;
}> = ({ timesheet, onChange, status }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);
  const canAprovar = status !== "aprovado";

  return (
    <>

      {
        timesheet.status.toString().toLocaleLowerCase() === 'submetido' ? (
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
                  onChange(timesheet);
                }}
                disabled={!canAprovar}
              >
                <ListItemIcon>
                  <CheckBox fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Aprovar TimeSheet" />
              </MenuItem>
            </Menu>
          </>) : (null)}
    </>
  );
};
