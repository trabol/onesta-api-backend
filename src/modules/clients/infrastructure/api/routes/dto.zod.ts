import { z, } from 'zod';
export const clientSchema = z
  .object({
    body: z
      .object({
        email: z.string().email().min(3, "email requerido, minimo 3 caracteres"),
        nombre: z.string().min(3, "nombre requerido, minimo 3 caracteres"),
        apellido: z.string().min(3, "apellido requerido, minimo 3 caracteres")
      }),
  });

export type clientTypeZod = z.infer<typeof clientSchema>["body"];