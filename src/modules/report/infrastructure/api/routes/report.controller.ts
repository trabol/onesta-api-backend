//doamin  transfer
import { IApiResponse } from '../../../../../shared/interface/api/format';
import { IreportDto,IreportRepository,IFilesRepository } from '../../../domain/report.domain';
import CreateReportCase from '../../../application/case/create.report';
import UploadReportCase from '../../../application/case/upload.report';




export default class ReportController {
  //case de uso crear report
  private createReportCase: CreateReportCase;
  //subir file csv report
  private uploadReportCase:UploadReportCase;
  constructor(
    reportRepository: IreportRepository,
    filesRepository:IFilesRepository
  ) {
    //create post report
    this.createReportCase = new CreateReportCase(reportRepository);
    //upload report
    this.uploadReportCase = new UploadReportCase(reportRepository,filesRepository);
  }
  public async createReportController(body: IreportDto):Promise<IApiResponse> {
    return this.createReportCase.createReport(body);
  }

  public async UploadCSVReportController(files: any):Promise<IApiResponse> {
    return this.uploadReportCase.UploadReport(files);
  }
}
