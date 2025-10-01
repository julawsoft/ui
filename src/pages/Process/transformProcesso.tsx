// utils/transformProcesso.tsx
import { IconButton } from "@mui/material";
import { Visibility, Edit } from "@mui/icons-material";
import type { IProcesso } from "../../schema/InterfaceProcess";

export const processoColumns = [
  { id: "ref", label: "Referência", flex: 1 },
  { id: "assunto", label: "Assunto", flex: 1.5 },
  { id: "area", label: "Área", flex: 1 },
  { id: "fase", label: "Fase", flex: 1 },
  { id: "instituicao", label: "Instituição", flex: 1 },
  { id: "cliente", label: "Cliente", flex: 1 },
  { id: "estado", label: "Estado", flex: 1 },
  { id: "gestor", label: "Gestor", flex: 1 },
  { id: "horas_mes", label: "Horas/Mês", flex: 1 },
  { id: "data_registo", label: "Data Registo", flex: 1 },
  { id: "actions", label: "Ações", flex: 1 },
];

export const transformDataProcesso = (
  data: IProcesso[],
  onEdit: (processo: IProcesso) => void,
  onView: (processo: IProcesso) => void
) => {
  return data.map((processo) => ({
    id: processo.id,
    ref: processo.ref,
    assunto: processo.assunto,
    area: processo.area,
    fase: processo.fase,
    instituicao: processo.instituicao,
    cliente: processo.cliente,
    estado: processo.estado,
    gestor: processo.gestor,
    horas_mes: processo.horas_mes ?? "-",
    data_registo: new Date(processo.data_registo).toLocaleDateString(),

    // ações
    actions: (
      <>
        <IconButton color="primary" onClick={() => onView(processo)}>
          <Visibility />
        </IconButton>
        <IconButton color="secondary" onClick={() => onEdit(processo)}>
          <Edit />
        </IconButton>
      </>
    ),
  }));
};
