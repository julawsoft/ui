// src/validation/clienteSchema.ts
import { z } from "zod";


export const timeSheetSchema = z.object({
  tarefaId: z.number().int().positive("O despesa deve ser um número positivo"),
  processoId: z.number(),
  clienteId: z.number(),
  descricao: z.string(),
  dataInicio: z.string(),
  horas: z.string(),
  timeSheetId: z.number().nullable().optional(),
});

export type TimeSheetFormData = z.infer<typeof timeSheetSchema>;
