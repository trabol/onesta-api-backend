import { IApiResponse } from "../../../shared/interface/api/format"

export interface IclientDto {
  email: string
  nombre: string
  apellido: string
}

export interface IclientParams {
  email: string
}

export interface IclientSchema {
  id: number
  email: string
  nombre: string
  apellido: string
  created_at: Date
  updated_at: Date
}
export interface IclientResponse extends IApiResponse {
  data?: IclientSchema[]
}

export interface IclientDomain {
  createClients(clientsDto: IclientDto): Promise<IclientResponse>
}

export interface IclientRepository {
  create(clientDto: IclientDto): Promise<IclientResponse>
  get(params: IclientParams): Promise<IclientResponse>
}