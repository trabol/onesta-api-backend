import { IApiResponse } from "../../../shared/interface/api/format"

export interface IreportDto {
  mail_agricultor: string
  nombre_agricultor: string
  apellido_agricultor: string
  mail_cliente: string
  nombre_cliente: string
  apellido_cliente: string
  nombre_campo: string
  ubicacion_campo: string
  fruta_cosechada: string
  variedad_cosechada: string
}

export interface IreportParams {
  id?: number
  mail_agricultor?: string
  nombre_agricultor?: string
  apellido_agricultor?: string
  mail_cliente?: string
  nombre_cliente?: string
  apellido_cliente?: string
  nombre_campo?: string
  ubicacion_campo?: string
  fruta_cosechada?: string
  variedad_cosechada?: string
}

export interface IreportSchema {
  id: number
  mail_agricultor: string
  nombre_agricultor: string
  apellido_agricultor: string
  mail_cliente: string
  nombre_cliente: string
  apellido_cliente: string
  nombre_campo: string
  ubicacion_campo: string
  fruta_cosechada: string
  variedad_cosechada: string
  created_at: Date
}
export interface IreportResponse extends IApiResponse {
  data?: IreportSchema[] | any
}

export interface IreportDomain {
  createReport?(reportDto: IreportDto): Promise<IreportResponse>
  UploadReport?(Files: any): Promise<IreportResponse>
}

export interface IreportRepository {
  create(reportDto: IreportDto): Promise<IreportResponse>
  get(params: IreportParams): Promise<IreportResponse>
}

export interface IFilesRepository {
  readFile(filePath: string): Promise<IreportResponse>
}



