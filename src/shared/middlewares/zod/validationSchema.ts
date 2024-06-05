import { Request, Response, NextFunction } from 'express';
import { z } from "zod";
import { IApiResponse } from '../../interface/api/format';

const requestSchema = z.object({
  body: z.unknown().optional(),
  params: z.unknown().optional(),
  query: z.unknown().optional(),
  headers: z.unknown().optional(),
  file: z.unknown().optional()
});

const validateSchemas =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, params, query, headers, file } = req;

      // Combinar el esquema del request con el esquema específico proporcionado
      const fullSchema = requestSchema.extend({
        body: schema.shape.body || requestSchema.shape.body,
        params: schema.shape.params || requestSchema.shape.params,
        query: schema.shape.query || requestSchema.shape.query,
        headers: schema.shape.headers || requestSchema.shape.headers,
        file: schema.shape.file || requestSchema.shape.file
      });

      // Validar el request completo
      fullSchema.parse({ body, params, query, headers, file });

      return next();

    } catch (error: any) {
      const apiError: IApiResponse = {
        code: 500,
        message: "Error internal server 500",
        stackError: error?.message || "error Undefined"
      }
      if (error instanceof z.ZodError) {
        apiError.code = 400;
        apiError.message = "Bad request";
        apiError.stackError = error.issues;
      }

      return res
        .status(apiError.code)
        .send(apiError);
    }
  }

export default validateSchemas;
