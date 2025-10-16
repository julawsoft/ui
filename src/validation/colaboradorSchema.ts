// src/validation/colaboradorSchema.ts
import { z } from 'zod';

export const colaboradorSchema = z.object({
  nome_completo: z.string().min(3, "Nome completo deve ter ao menos 3 caracteres"),
  nome_profissional: z.string().min(3, "Nome profissional deve ter ao menos 3 caracteres").optional().nullable(),
  funcao: z.string("Função deve ter ao menos 2 caracteres"),
  tipo_colaborador_id: z.string().nullable(),
  categoria_id: z.string().nullable(),
  data_nascimento: z.string().optional().nullable(),
  taxa_horaria: z.string(),
  status: z.enum(['active', 'inactive']),
  contacto_pessoal: z.string().optional(),
  contacto_emergencia: z.string().optional(),
  n_identificacao: z.string("N.º Identificação é obrigatório"),
  n_cedula_ordem: z.string().optional().nullable(),
  email_pessoal: z.string().email("Email pessoal inválido").optional().nullable(),
  email_corporativo: z.string().email("Email corporativo inválido").optional().nullable(),
  userName: z.string("Usuário é obrigatório"),
  inicial: z.string("Inicial do Usuário é obrigatório"),
});

export type ColaboradorFormData = z.infer<typeof colaboradorSchema>;
