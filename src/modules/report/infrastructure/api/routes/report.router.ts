import { Router, Request, Response } from 'express';

//Domain
//infrastructure prisma
import ReportController from './report.controller';
import ReportRepository from "../../repository/report.repository";
//infrastructure integration
import FilesIntegration from '../../repository/files.integration';



//infrastructure zod
import { reportSchema, reportTypeZod, FileSchema, FileTypeZod } from './dto.zod';
//shared
import middlewarValidateSchemaZod from '../../../../../shared/middlewares/zod/validationSchema';



export default class ReportRouter {
  public router: Router;
  public reportController: ReportController;
  private version: string



  constructor(version: string) {
    this.version = version;
    this.router = Router();
    this.reportController = new ReportController(
      new ReportRepository,
      new FilesIntegration,
    )

    this.router.post(
      `/${this.version}/report`,
      middlewarValidateSchemaZod(reportSchema),
      this.createReportRouter
    );

    this.router.post(
      `/${this.version}/report/upload-csv`,
      middlewarValidateSchemaZod(FileSchema),
      this.uploadCSVReportRouter
    );

  }

  createReportRouter = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const body: reportTypeZod = req.body;
      const respApi = await this.reportController.createReportController(body);
      return resp
        .status(respApi.code)
        .send(respApi);
    } catch (e: any) {
      const error = {
        code: 500,
        message: "Ha ocurrico un error general en la aplicación(Internal server error 500) favor reiniciar servidor",
        stackError: e.message
      }
      return resp.status(500).send(error);
    }
  }

  uploadCSVReportRouter = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const files:FileTypeZod =req.files;
      const respApi = await this.reportController.UploadCSVReportController(files);
      return resp
        .status(respApi.code)
        .send(respApi);
    } catch (e: any) {
      const error = {
        code: 500,
        message: "Ha ocurrico un error general en la aplicación(Internal server error 500) favor reiniciar servidor",
        stackError: e.message
      }
      return resp.status(500).send(error);
    }
  }
}
