import { z } from "zod";

export const processoSchema = z.object({
  assunto: z
    .string()
    .min(3, "Assunto deve ter ao menos 3 caracteres")
    .max(100, "Assunto deve ter no máximo 255 caracteres"),

  area: z
    .string()
    .min(2, "Área deve ter ao menos 2 caracteres")
    .max(100, "Área deve ter no máximo 100 caracteres"),

  fase: z
    .string()
    .min(2, "Fase deve ter ao menos 2 caracteres")
    .max(100, "Fase deve ter no máximo 100 caracteres"),

  instituicaoId: z
    .string()
    .min(1, "Instituição é obrigatória"),

  modoFacturacao: z
    .string()
    .min(1, "Modo de facturação é obrigatório"),

  gestorId: z
    .string()
    .min(1, "Gestor é obrigatório"),

  clienteId: z
    .string()
    .min(1, "Cliente é obrigatório"),

  contraParte: z
    .string(),
  dataRegisto: z
    .string()
    .min(1, "Data de registo é obrigatória"),

    estadoId: z
    .string(),
  horasMes: z
    .string()
    .nullable()
    .optional(),

    nProcessoJudicial: z
    .string()
    .nullable()
    .optional(),

  valorTotal: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? null : Number(val)))
    .nullable()
    .optional(),
});

export type ProcessoFormData = z.infer<typeof processoSchema>;
