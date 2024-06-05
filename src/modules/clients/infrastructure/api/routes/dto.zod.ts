import { z, } from 'zod';
export const clientSchema = z.object({
  body: z.array(
    z.object({
      email: z.string().email().min(3, "email requerido, minimo 3 caracteres"),
      nombre: z.string().min(3, "nombre requerido, minimo 3 caracteres"),
      apellido: z.string().min(3, "apellido requerido, minimo 3 caracteres")
    }).strict() // Aplicar .strict() al objeto dentro del array
  )
}).strict(); // Aplicar .strict() al objeto que contiene el array

export type clientTypeZod = z.infer<typeof clientSchema>["body"];