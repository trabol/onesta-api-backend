//domain transfer
import { IclientResponse, IclientDto, IclientRepository, IclientDomain } from "../../../domain/client.domain";

export default class CreateClientCase implements IclientDomain {
  private clientRepository: IclientRepository;

  constructor(clientRepository: IclientRepository) {
    this.clientRepository = clientRepository;
  }
  async createClients(data: IclientDto[]): Promise<IclientResponse> {
    return await this.clientRepository.create(data[0]);
  }

}
