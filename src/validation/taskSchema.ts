// src/validation/taskSchema.ts
import { z } from "zod";

export const taskSchema = z.object({
  descricao: z
    .string()
    .min(3, "A descrição deve ter pelo menos 3 caracteres"),

  estado: z
    .string()
    .min(1, "O estado é obrigatório"),

  dataParaRealizacao: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
  horaParaRealizacao: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  processoId: z
    .number()
    .int()
    .positive("O processoId deve ser um número positivo")
    .nullable(),

  clienteId: z
    .number()
    .int()
    .positive("O clienteId deve ser um número positivo")
    .nullable(),

  gestorId: z
    .number()
    .int()
    .positive("O gestorId deve ser um número positivo")
    .nullable(),

  colaboradorId: z
    .number()
    .int()
    .positive("O colaboradorId é obrigatório"),

  tipoTarefaId: z
    .number()
    .int()
    .positive("O tipoTarefaId deve ser um número positivo")
    .nullable(),
    tarefaId: z
    .number()
    .int()
    .positive("O tipoTarefaId deve ser um número positivo")
    .nullable(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
