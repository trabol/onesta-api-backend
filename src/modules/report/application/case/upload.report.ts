//domain transfer
import {
  IreportDomain,
  IreportDto,
  IreportResponse,
  IFilesRepository,
  IreportRepository,
} from "../../domain/report.domain";

export default class UploadCSVReportCase implements IreportDomain {
  private IreportRepository: IreportRepository;
  private fileRepository: IFilesRepository;

  constructor(
    IreportRepository: IreportRepository,
    fileRepository: IFilesRepository
  ) {
    this.fileRepository = fileRepository;
    this.IreportRepository = IreportRepository

  }


  async UploadReport(Files: any): Promise<IreportResponse> {
    //inicial resultado de la carga
    const result: any = { total: 0, ok: 0, error: [] };
    //leer documento csv
    const reports = await this.fileRepository.readFile(Files.files.path);
    //devolver error al leer el csv
    if (reports.code != 200) { return reports; }
    
    //continuar con ejecucion
    result.total = reports.data.length;
    await Promise.all(
      reports.data.map(async (report: IreportDto, row: number) => {
        const response = await this.validRowReportCsv(report, row);
        //si validacion es correcta carga registro dentor de reporte
        if (response.code == 200) {
          const reportCreated = await this.IreportRepository.create(report);
          //aumentar contador de ok
          if (reportCreated.code == 201) {
            result.ok = result.ok + 1;
          } else {
            //devolver error en crear mas row(fila del error);
            result.error.push({ ...reportCreated, row });
          }
        } else {
          //devolver error de validacion mas row(fila del error);
          result.error.push(response)
        }
      })
    );
    //entregar resultado al cliente
    return { code: 200, message: "message", data: { ...result } }
  }

  //Valida que cada file cumpla con las caracteristicas del requeridas antes de crear
  private async validRowReportCsv(report: IreportDto, row: number): Promise<IreportResponse> {
    const {
      fruta_cosechada,
      mail_agricultor,
      mail_cliente,
      nombre_campo,
      ubicacion_campo,
      variedad_cosechada
    } = report;

    const response = { code: 200, message: "success", row };
    //El nombre de la fruta debe ser única.
    const reportsValid1 = await this.IreportRepository.get({ fruta_cosechada });
    if (reportsValid1.code == 500) { return reportsValid1; }
    if (reportsValid1?.data?.length) {
      response.code = 409;
      response.message = `conflicto de recurso, fruta_cosechada "${fruta_cosechada}" ya existe`;
    }
    // //El mail debe ser único dentro de los agricultores.
    const reportsValid2 = await this.IreportRepository.get({ mail_agricultor });
    if (reportsValid2.code == 500) { return reportsValid2; }
    if (reportsValid2?.data?.length) {
      response.code = 409;
      response.message = `conflicto de recurso, mail_agricultor "${mail_agricultor}" ya existe`;
    }
    // //El mail debe ser único dentro de los clientes.
    const reportsValid3 = await this.IreportRepository.get({ mail_cliente });
    if (reportsValid3.code == 500) { return reportsValid3; }
    if (reportsValid3?.data?.length) {
      response.code = 409;
      response.message = `conflicto de recurso, mail_cliente "${mail_cliente}" ya existe`;
    }
    // //La combinación Nombre Ubicación de los campos debe ser única.
    const reportsValid4 = await this.IreportRepository.get({ nombre_campo, ubicacion_campo });
    if (reportsValid4.code == 500) { return reportsValid4; }
    if (reportsValid4?.data?.length) {
      response.code = 409;
      response.message = `conflicto de recurso, combinacion nombre_campo,ubicacion_campo "${nombre_campo},${ubicacion_campo}" ya existe`;
    }
    // //La combinación fruta variedad debe ser única.
    const reportsValid5 = await this.IreportRepository.get({ fruta_cosechada, variedad_cosechada });
    if (reportsValid5.code == 500) { return reportsValid5; }
    if (reportsValid5?.data?.length) {
      response.code = 409;
      response.message = `conflicto de recurso, combinacion fruta_cosechada,variedad_cosechada "${fruta_cosechada},${variedad_cosechada}" ya existe`;
    }
    return response;
  }

}
