import { Router, Request, Response } from 'express';

//Domain
//infrastructure prisma
import HarvestController from './harvest.controller';
import HarvestRepository from "../../repository/harvest.repository";


//infrastructure zod
import { harvestSchema,harvestTypeZod} from './dto.zod';
//shared
import middlewarValidateSchemaZod from '../../../../../shared/middlewares/zod/validationSchema';



export default class HarvestRouter {
  public router: Router;
  public harvestController: HarvestController;
  private version: string

  

  constructor(version:string) {
    this.version = version;
    this.router = Router();
    this.harvestController = new HarvestController(
      new HarvestRepository,
    )

    this.router.post(
      `/${this.version}/harvest`,
      middlewarValidateSchemaZod(harvestSchema),
      this.createHarvestRouter
    );
    
  }

  createHarvestRouter = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const body: harvestTypeZod = req.body;
      const respApi = await this.harvestController.createHarvestController(body);
      return resp
        .status(respApi.code)
        .send(respApi);
    } catch (e:any) {
      const error= {
        code: 500,
        message: "Ha ocurrico un error general en la aplicación(Internal server error 500) favor reiniciar servidor",
        stackError: e.message
      }
      return resp.status(500).send(error);
    }
  }
}
