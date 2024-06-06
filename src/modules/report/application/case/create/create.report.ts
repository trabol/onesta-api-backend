//domain transfer
import {
  IreportDomain,
  IreportDto,
  IreportParams,
  IreportRepository,
  IreportResponse
} from "../../../domain/report.domain";

export default class CreateReportCase implements IreportDomain {
  private IreportRepository: IreportRepository;

  constructor(IreportRepository: IreportRepository) {
    this.IreportRepository = IreportRepository;
  }


  async createReport(reportDto: IreportDto): Promise<IreportResponse> {
    let params: IreportParams = {fruta_cosechada:reportDto.fruta_cosechada};
    const {fruta_cosechada} =reportDto;

    //valid unico nombre de fruta
    const reportsValid1 = await this.IreportRepository.get({fruta_cosechada});
    if (reportsValid1.code == 500) { return reportsValid1; }
    if (reportsValid1?.data?.length) {
      return { code: 409, message: `conflicto de recurso, fruta_cosechada ${fruta_cosechada} ya existe` };
    }
    return await this.IreportRepository.create(reportDto);
  }

}
