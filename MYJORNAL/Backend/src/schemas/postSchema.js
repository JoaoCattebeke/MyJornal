import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Título é obrigatório' })
      .min(2, 'Mínimo 2 caracteres')
      .max(200, 'Máximo 200 caracteres'),
    description: z
      .string({ required_error: 'Descrição é obrigatória' })
      .min(1, 'Descrição não pode ser vazia'),
    isPublic: z
      .boolean()
      .optional()
      .default(true),
  }),
});

export const deletePostSchema = z.object({
  params: z.object({
    id: z.string().length(24, 'ID inválido'),
  }),
});
