//doamin  transfer
import { IApiResponse } from '../../../../../shared/interface/api/format';
import { IharvestDto, IharvestRepository } from '../../../domain/harvests.domain';
import CreateHarvestCase from '../../../application/case/create/harvest';




export default class HarvestsController {
  //case de uso crear harvests
  private createHarvestCase: CreateHarvestCase;
  constructor(harvestRepository: IharvestRepository) {
    this.createHarvestCase = new CreateHarvestCase(harvestRepository);
  }
  public async createHarvestController(body: IharvestDto): Promise<IApiResponse> {
    return this.createHarvestCase.createHarvest(body);
  }
}
