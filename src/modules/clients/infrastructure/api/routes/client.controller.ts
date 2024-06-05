//doamin  transfer
import { IApiResponse } from '../../../../../shared/interface/api/format';
import { IclientRepository, IclientDto } from '../../../domain/client.domain';
import CreateClientCase from '../../../application/case/create/clients';




export default class ClientController {
  //case de uso crear clientes
  private createClientCase: CreateClientCase;
  constructor(clientRepository: IclientRepository) {
    this.createClientCase = new CreateClientCase(clientRepository);
  }
  public async createClientController(body: IclientDto[]): Promise<IApiResponse> {
    return this.createClientCase.createClients(body);
  }
}
