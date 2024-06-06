import { z, } from 'zod';
export const reportSchema = z
  .object({
    body: z
      .object({
        mail_agricultor: z
          .string()
          .min(1, { message: "mail_agricultor requerido" })
          .email("mail_agricultor no es valido"),
        nombre_agricultor: z
          .string()
          .min(3, "nombre_agricultor requerido, minimo 3 caracteres"),
        apellido_agricultor: z
          .string()
          .min(3, "apellido_agricultor requerido, minimo 3 caracteres"),
        mail_cliente: z
          .string()
          .min(1, { message: "mail_cliente requerido" })
          .email("mail_cliente no es valido"),
        nombre_cliente: z
          .string()
          .min(3, "nombre_cliente requerido, minimo 3 caracteres"),
        apellido_cliente: z
          .string()
          .min(3, "apellido_cliente requerido, minimo 3 caracteres"),
        nombre_campo: z
          .string()
          .min(3, "nombre_campo requerido, minimo 3 caracteres"),
        ubicacion_campo: z
          .string()
          .min(3, "ubicacion_campo requerido, minimo 3 caracteres"),
        fruta_cosechada: z
          .string()
          .min(3, "fruta_cosechada requerido, minimo 3 caracteres"),
        variedad_cosechada: z
          .string()
          .min(3, "Variedad_cosechada requerido, minimo 3 caracteres"),
      }),
  });

export type reportTypeZod = z.infer<typeof reportSchema>["body"];