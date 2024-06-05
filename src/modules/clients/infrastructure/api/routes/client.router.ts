import { Router, Request, Response } from 'express';

//Domain
//infrastructure prisma
import ClientController from './client.controller';
import ClientRepository from "../../repository/client.repository";


//infrastructure zod
import { clientSchema,  clientTypeZod} from './dto.zod';
//shared
import middlewarValidateSchemaZod from '../../../../../shared/middlewares/zod/validationSchema';



export default class ClientRouter {
  public router: Router;
  public clientController: ClientController;
  private version: string

  

  constructor(version:string) {
    this.version = version;
    this.router = Router();
    this.clientController = new ClientController(
      new ClientRepository,
    )

    this.router.post(
      `/${this.version}/client`,
      middlewarValidateSchemaZod(clientSchema),
      this.createClientRouter
    );
    
  }

  createClientRouter = async (req: Request, resp: Response): Promise<Response> => {
    try {
      const body: clientTypeZod = req.body;
      const respApi = await this.clientController.createClientController(body);
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
