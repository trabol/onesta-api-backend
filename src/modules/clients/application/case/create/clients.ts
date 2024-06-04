//domain transfer
import { IclientResponse, IclientDto, IclientRepository, IclientDomain } from "../../../domain/client.domain";

export default class CreateClientCase implements IclientDomain {
  private clientRepository: IclientRepository;
  private response!: IclientResponse;
  
  constructor(clientRepository: IclientRepository) {
    this.clientRepository = clientRepository;
  }
  async createClients(clientsDto: IclientDto[]): Promise<IclientResponse> {

    const clients = await this.clientRepository.createMany(clientsDto);

    this.response.code = 200;
    this.response.message = "success";
    this.response.clients = clients;

    return this.response;
  }

}
