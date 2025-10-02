// src/validation/colaboradorSchema.ts
import { z } from 'zod';

// Schema de validação do formulário de colaborador
export const colaboradorSchema = z.object({
  nome_completo: z.string().min(3, "Nome completo deve ter ao menos 3 caracteres"),
  nome_profissional: z.string().min(3, "Nome profissional deve ter ao menos 3 caracteres").optional().nullable(),
  inicial: z.string().max(5, "Inicial muito longa").optional().nullable(),
  funcao: z.string().min(2, "Função deve ter ao menos 2 caracteres").optional().nullable(),
  tipo_colaborador_id: z.number().nullable(),
  categoria_id: z.number().nullable(),
  data_nascimento: z.string().optional().nullable(), // tipo date ou string ISO
  taxa_horaria: z.number().nonnegative("Taxa horária não pode ser negativa").nullable(),
  status: z.enum(['active', 'inactive']),
  contacto_pessoal: z.string().min(7, "Contacto pessoal inválido").optional().nullable(),
  contacto_emergencia: z.string().min(7, "Contacto de emergência inválido").optional().nullable(),
  n_identificacao: z.string().optional().nullable(),
  n_cedula_ordem: z.string().optional().nullable(),
  email_pessoal: z.string().email("Email pessoal inválido").optional().nullable(),
  email_corporativo: z.string().email("Email corporativo inválido").optional().nullable(),
  // campos internos não preenchidos pelo usuário, mas mantidos para TypeScript
  token_reset: z.string().optional().nullable(),
  uuid: z.string().optional(),
  tipoColaborador: z.string().optional().nullable(),
  categoria: z.string().optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

// Tipo do formulário baseado no schema
export type ColaboradorFormData = z.infer<typeof colaboradorSchema>;
