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

  instituicao_id: z
    .string()
    .min(1, "Instituição é obrigatória"),

  modo_facturacao: z
    .string()
    .min(1, "Modo de facturação é obrigatório"),

  gestor_id: z
    .string()
    .min(1, "Gestor é obrigatório"),

  cliente_id: z
    .string()
    .min(1, "Cliente é obrigatório"),

  contra_parte: z
    .string(),
  data_registo: z
    .string()
    .min(1, "Data de registo é obrigatória"),

    estado_id: z
    .string(),
  horas_mes: z
    .string()
    .nullable()
    .optional(),

    n_processo_judicial: z
    .string()
    .nullable()
    .optional(),

  valor_total: z
    .union([z.number(), z.string()])
    .transform((val) => (val === "" ? null : Number(val)))
    .nullable()
    .optional(),
});

export type ProcessoFormData = z.infer<typeof processoSchema>;
