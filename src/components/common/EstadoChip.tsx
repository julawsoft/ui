import React from "react";
import { Chip } from "@mui/material";

type Estado =
  | "activo"
  | "suspenso"
  | "encerrado"
  | "em_andamento"
  | "arquivado"
  | "em_revisao"
  | "proposta"
  | "cancelado"
  | string
  | undefined;

interface EstadoChipProps {
  estado: Estado;
}

const coresPorEstado: Record<string, { label: string; color: "success" | "warning" | "error" | "default" | "info" | "primary" | "secondary" }> = {
  Activo: { label: "Activo", color: "success" },
  suspenso: { label: "Suspenso", color: "warning" },
  encerrado: { label: "Encerrado", color: "default" },
  em_andamento: { label: "Em Andamento", color: "info" },
  arquivado: { label: "Arquivado", color: "secondary" },
  em_revisao: { label: "Em Revisão", color: "primary" },
  proposta: { label: "Proposta", color: "primary" },
  cancelado: { label: "Cancelado", color: "error" },
};

const EstadoChip: React.FC<EstadoChipProps> = ({ estado}) => {
  console.log("O estado do process", estado)

  if (!estado) {
    return <Chip label="Indefinido" color="default" variant="outlined" />;
  }

  const key = estado.toLowerCase();

  const config = coresPorEstado[key] || { label: estado, color: "default" };
  console.log(key)
  console.log("", config)
  return (
    <Chip
      label={config.label}
      color={config.color}
      variant="outlined"
      sx={{
        textTransform: "capitalize",
        fontWeight: 500,
        borderWidth: 1.5,
      }}
    />
  );
};

export default EstadoChip;
