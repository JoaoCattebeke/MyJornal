import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Nome obrigatorio' })
      .min(2, 'Minimo 2 caracteres')
      .max(100, 'Maximo 100 caracteres'),
    email: z
      .string()
      .email('Email invalido'),
    password: z
      .string()
      .min(8, 'Minimo 8 caracteres')
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/,
        'Precisa de maiuscula e numero'
      ),
    imagem: z
      .string()
      .url('Imagem deve ser uma URL valida')
      .optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    imagem: z
      .string()
      .url('Imagem deve ser uma URL valida')
      .optional(),
  }),
  params: z.object({
    id: z.string().length(24, 'ID invalido'),
  }),
});
