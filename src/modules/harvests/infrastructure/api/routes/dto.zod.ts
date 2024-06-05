import { z, } from 'zod';
export const harvestSchema = z
  .object({
    body: z
      .object({
        direccion: z.string().min(3, "direccion requerido, minimo 3 caracteres"),
        nombre: z.string().min(3, "nombre requerido, minimo 3 caracteres"),
      }),
  });

export type harvestTypeZod = z.infer<typeof harvestSchema>["body"];