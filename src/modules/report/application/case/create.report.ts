//domain transfer
import {
  IreportDomain,
  IreportDto,
  IreportRepository,
  IreportResponse
} from "../../domain/report.domain";

export default class CreateReportCase implements IreportDomain {
  private IreportRepository: IreportRepository;

  constructor(IreportRepository: IreportRepository) {
    this.IreportRepository = IreportRepository;
  }


  async createReport(reportDto: IreportDto): Promise<IreportResponse> {
    const {
      fruta_cosechada,
      mail_agricultor,
      mail_cliente,
      nombre_campo,
      ubicacion_campo,
      variedad_cosechada
    } = reportDto;

    //El nombre de la fruta debe ser única.
    const reportsValid1 = await this.IreportRepository.get({ fruta_cosechada });
    if (reportsValid1.code == 500) { return reportsValid1; }
    if (reportsValid1?.data?.length) {
      return { code: 409, message: `conflicto de recurso, fruta_cosechada "${fruta_cosechada}" ya existe` };
    }
    //El mail debe ser único dentro de los agricultores.
    const reportsValid2 = await this.IreportRepository.get({ mail_agricultor });
    if (reportsValid2.code == 500) { return reportsValid2; }
    if (reportsValid2?.data?.length) {
      return { code: 409, message: `conflicto de recurso, mail_agricultor "${mail_agricultor}" ya existe` };
    }
    //El mail debe ser único dentro de los clientes.
    const reportsValid3 = await this.IreportRepository.get({ mail_cliente });
    if (reportsValid3.code == 500) { return reportsValid3; }
    if (reportsValid3?.data?.length) {
      return { code: 409, message: `conflicto de recurso, mail_cliente "${mail_cliente}" ya existe` };
    }
    //La combinación Nombre Ubicación de los campos debe ser única.
    const reportsValid4 = await this.IreportRepository.get({ nombre_campo, ubicacion_campo });
    if (reportsValid4.code == 500) { return reportsValid4; }
    if (reportsValid4?.data?.length) {
      return { code: 409, message: `conflicto de recurso, combinacion nombre_campo,ubicacion_campo "${nombre_campo},${ubicacion_campo}" ya existe` };
    }

    //La combinación fruta variedad debe ser única.
    const reportsValid5 = await this.IreportRepository.get({ fruta_cosechada, variedad_cosechada });
    if (reportsValid5.code == 500) { return reportsValid5; }
    if (reportsValid5?.data?.length) {
      return { code: 409, message: `conflicto de recurso, combinacion fruta_cosechada,variedad_cosechada "${fruta_cosechada},${variedad_cosechada}" ya existe` };
    }

    //crear report
    return await this.IreportRepository.create(reportDto);
  }

}
