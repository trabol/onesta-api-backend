import { PrismaClient } from "@prisma/client";

import { 
  IreportDto,
  IreportParams,
  IreportRepository,
  IreportResponse
} from "../../domain/report.domain";


import ErrorCodes from "../../../../shared/prisma/middlewares/error.code";

export default class ReportRepository implements IreportRepository {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient({ errorFormat: 'minimal' })
  }
  public async get(params: IreportParams): Promise<IreportResponse> {
    try {
      const report = await this.prisma.report.findMany({ where: params });
      return {
        code: 200,
        message: "success",
        data: report
      };
    } catch (err: any) {
      await this.prisma.$disconnect();
      return ErrorCodes(err)
    }
  }

  public async create(data: IreportDto): Promise<IreportResponse> {
    try {
      const report = await this.prisma.report.create({data});
      return {
        code: 201,
        message: "success",
        data: [report]
      };
    } catch (err: any) {
      await this.prisma.$disconnect();
      return ErrorCodes(err)
    }
  }

}
