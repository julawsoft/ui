// src/validation/clienteSchema.ts
import { z } from "zod";


export const timeSheetSchema = z.object({
  tipoEventoId: z.number().int().positive("O despesa deve ser um número positivo"),
  processoId: z.number(),
  clienteId: z.number(),
  descricao: z.string(),
  dadosImportantes: z.string(),
  dataInicio: z.string(),
  dataFim: z.string(),
  horas: z.string(),
});

export type TimeSheetFormData = z.infer<typeof timeSheetSchema>;
