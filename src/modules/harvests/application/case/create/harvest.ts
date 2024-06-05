//domain transfer
import { IharvestDto, IharvestParams, IharvestResponse, IharvestDomain, IharvestRepository } from "../../../domain/harvests.domain";

export default class CreateHarvestCase implements IharvestDomain {
  private harvestRepository: IharvestRepository;

  constructor(harvestRepository: IharvestRepository) {
    this.harvestRepository = harvestRepository;
  }

  async createHarvest(data: IharvestDto): Promise<IharvestResponse> {

    const params: IharvestParams = { direccion: data.direccion, nombre: data.nombre };
    const harvests = await this.harvestRepository.get(params);
    if (harvests.code == 500) {
      return harvests;
    }
    if (harvests?.data?.length) {
      return { code: 409, message: `conflicto de recurso, combinacion de dirrecion ${data.direccion} nombre ${data.nombre} de campo (Harvest) ya existe` };
    }
    return await this.harvestRepository.create(data);
  }

}
