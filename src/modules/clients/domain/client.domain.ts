export interface IclientDto {
  email: string
  nombre: string
  apellido: string
}

export interface IclientSchema {
  id: number
  email: string
  nombre: string
  apellido: string
  created_at: Date
  updated_at: Date
}

export interface IclientResponse {
  code: number
  message: string
  clients?: IclientSchema[]
}

export interface IclientDomain {
  createClients(clientsDto: IclientDto[]): Promise<IclientResponse>
}

export interface IclientRepository {
  createMany(clientsDto: IclientDto[]): Promise<IclientSchema[]>
}