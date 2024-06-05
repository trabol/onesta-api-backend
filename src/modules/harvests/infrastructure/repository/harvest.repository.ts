import { PrismaClient } from "@prisma/client";

import { IharvestDto,IharvestParams,IharvestRepository, IharvestResponse, } from "../../domain/harvests.domain";


import ErrorCodes from "../../../../shared/prisma/middlewares/error.code";
import environments from "../../../../shared/environments"

export default class ClientRepository implements IharvestRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ errorFormat: 'minimal' })
  }
  public async get(params: IharvestParams): Promise<IharvestResponse> {
    try {
      const harvest = await this.prisma.harvest.findMany({ where: params });
      return {
        code: 200,
        message: "success",
        data: harvest
      };
    } catch (err: any) {
      await this.prisma.$disconnect();
      return ErrorCodes(err)
    }
  }

  public async create(harvestDto: IharvestDto): Promise<IharvestResponse> {
    try {
      const schemaHarvest = await this.prisma.harvest.create({
        data: harvestDto,
      });
      return {
        code: 201,
        message: "success",
        data: [schemaHarvest]
      };
    } catch (err: any) {
      await this.prisma.$disconnect();
      return ErrorCodes(err)
    }
  }

}
