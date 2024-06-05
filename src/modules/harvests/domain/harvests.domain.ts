import { IApiResponse } from "../../../shared/interface/api/format"

export interface IharvestDto {
  direccion: string
  nombre: string
}

export interface IharvestParams {
  direccion: string
  nombre: string
}

export interface IharvestSchema {
  id: number
  direccion: string
  nombre: string
  created_at: Date
  updated_at: Date
}
export interface IharvestResponse extends IApiResponse {
  data?: IharvestSchema[]
}

export interface IharvestDomain {
  createHarvest(harvestDto: IharvestDto): Promise<IharvestResponse>
}

export interface IharvestRepository {
  create(harvestDto: IharvestDto): Promise<IharvestResponse>
  get(params: IharvestParams): Promise<IharvestResponse>
}