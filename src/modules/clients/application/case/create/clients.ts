//domain transfer
import { IclientResponse, IclientDto, IclientRepository, IclientDomain, IclientParams } from "../../../domain/client.domain";

export default class CreateClientCase implements IclientDomain {
  private clientRepository: IclientRepository;

  constructor(clientRepository: IclientRepository) {
    this.clientRepository = clientRepository;
  }
  async createClients(data: IclientDto): Promise<IclientResponse> {

    const params: IclientParams = { email: data.email };
    const clients = await this.clientRepository.get(params);
    if (clients.code == 500) {
      return clients;
    }
    if (clients?.data?.length) {
      return { code: 409, message: `conflicto de recurso, email ${data.email} ya existe` }
    }
    return await this.clientRepository.create(data);
  }

}
