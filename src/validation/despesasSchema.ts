// src/validation/clienteSchema.ts
import { z } from "zod";

export const despesasSchema = z.object({
  tipo_despesa: z.number().int().positive("O despesa deve ser um número positivo"),
  processo_n: z.number(),
  cliente_id: z.number(),
  valor: z.string(),
});

export type DespesasFormData = z.infer<typeof despesasSchema>;
