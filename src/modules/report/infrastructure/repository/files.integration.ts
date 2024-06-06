//librerias
import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';


import {
  IFilesRepository,
  IreportResponse,
} from "../../domain/report.domain";


export default class FilesIntegration implements IFilesRepository {
  constructor() { }
  async readFile(filePath: string): Promise<IreportResponse> {
    try {
      const response: IreportResponse = { code: 200, message: "success", data: [] }
      const stream = fs.createReadStream(filePath).pipe(csvParser({
        strict: true,
        separator: ',',
        newline: '\n',
        skipLines: 1,
        headers: ["mail_agricultor", "nombre_agricultor", "apellido_agricultor", "mail_cliente", "nombre_cliente", "apellido_cliente", "nombre_campo", "ubicacion_campo", "fruta_cosechada", "variedad_cosechada"],
      }));

      return new Promise((resolve, reject) => {
        stream
          .on('data', (data) => response.data.push(data))
          .on('end', () => resolve(response))
          .on('error', (error) => reject(error));
      });
    }
    catch (error: any) {
      return {
        code: 500,
        message: error?.message || "error readFile",
      };
    }
  }
}
