// src/validation/clienteSchema.ts
import { z } from "zod";

export const despesasSchema = z.object({
  tipo_despesa: z.string(),
  processo_n: z.string(),
  cliente_id: z.string(),
  valor: z.string(),
});

export type DespesasFormData = z.infer<typeof despesasSchema>;
