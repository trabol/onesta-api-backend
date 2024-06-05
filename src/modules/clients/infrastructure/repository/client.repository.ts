import { PrismaClient } from "@prisma/client";

import { IclientDto, IclientParams, IclientRepository, IclientResponse, } from "../../domain/client.domain";


import ErrorCodes from "../../../../shared/prisma/middlewares/error.code";
import environments from "../../../../shared/environments"

export default class ClientRepository implements IclientRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ errorFormat: 'minimal' })
  }
  public async get(params: IclientParams): Promise<IclientResponse> {
    try {
      const clients = await this.prisma.client.findMany({ where: params });
      return {
        code: 200,
        message: "success",
        data: clients
      };
    } catch (err: any) {
      await this.prisma.$disconnect();
      return ErrorCodes(err)
    }
  }

  public async create(clientDto: IclientDto): Promise<IclientResponse> {
    try {
      const schemaClient = await this.prisma.client.create({
        data: clientDto,
      });
      return {
        code: 201,
        message: "success",
        data: [schemaClient]
      };
    } catch (err: any) {
      await this.prisma.$disconnect();
      return ErrorCodes(err)
    }
  }

}
