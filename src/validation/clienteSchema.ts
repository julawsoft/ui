// src/validation/clienteSchema.ts
import { z } from "zod";

export const clienteSchema = z.object({
  denominacao: z.string().min(3, "A denominação deve ter pelo menos 3 caracteres"),
  tipo_id: z.string(),
  nif: z.string().regex(/^\d{9,10}$/, "O NIF deve ter 9 ou 10 dígitos"),
  endereco: z.string(),
  pessoa_contacto: z.string().min(3, "O nome do contacto deve ter pelo menos 3 caracteres"),
  contacto_cobranca: z.string("O contacto de cobrança é obrigatório"),
  // contacto_cobranca: z.number("O contacto de cobrança deve conter apenas números"),
  e_mail: z.string().email("Email inválido"),
  // uuid: z.string().uuid("UUID inválido"),
  nota: z.string().optional(),
  status: z.enum(["pending", "active", "inactive"], "Status inválido"),
});

export type ClienteFormData = z.infer<typeof clienteSchema>;
