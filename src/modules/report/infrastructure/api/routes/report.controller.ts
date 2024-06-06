//doamin  transfer
import { IApiResponse } from '../../../../../shared/interface/api/format';
import { IreportDto,IreportRepository } from '../../../domain/report.domain';
import CreateReportCase from '../../../application/case/create/create.report';




export default class ReportController {
  //case de uso crear report
  private createReportCase: CreateReportCase;
  constructor(reportRepository: IreportRepository) {
    this.createReportCase = new CreateReportCase(reportRepository);
  }
  public async createReportController(body: IreportDto):Promise<IApiResponse> {
    return this.createReportCase.createReport(body);
  }
}
