import { Injectable } from '@nestjs/common';
import { CampaignsRepository } from './repositories/campaigns.repository';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(private readonly campaignsRepository: CampaignsRepository) {}

  // Criar campanha
  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const startDate = new Date(createCampaignDto.dataInicio);
    const endDate = new Date(createCampaignDto.dataFim);

    // Verifique se a data de fim é maior que a data de início
    if (endDate <= startDate) {
      throw new Error('A data fim deve ser sempre maior que a data inicio');
    }

    // Verifique se a data de início é igual ou posterior à data atual
    const currentDate = new Date();
    if (startDate < currentDate) {
      throw new Error(
        'A data de início deve ser igual ou posterior à data atual'
      );
    }

    const campaign = await this.campaignsRepository.create(createCampaignDto);
    return campaign;
  }

  // Buscar todas as campanhas
  async findAll(): Promise<Campaign[] | null> {
    const campaigns = await this.campaignsRepository.findAll();
    const updatedCampaigns = await Promise.all(
      campaigns.map(async (campaign: Campaign) =>
        this.campaignsRepository.markExpired(campaign)
      )
    );
    return updatedCampaigns;
  }

  // Buscar campanha por ID
  async findOne(id: string): Promise<Campaign | null> {
    const campaign = await this.campaignsRepository.findOne(id);

    if (!campaign) return null;

    return this.campaignsRepository.markExpired(campaign);
  }

  // Atualizar campanha
  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto
  ): Promise<Campaign | null> {
    const campaign = await this.campaignsRepository.findOne(id);

    if (!campaign) return null;

    const updatedCampaign = {
      ...campaign,
      ...updateCampaignDto,
      dataInicio:
        updateCampaignDto.dataInicio || campaign.dataInicio.toString(),
      dataFim: updateCampaignDto.dataFim || campaign.dataFim.toString()
    };

    const startDate = new Date(updatedCampaign.dataInicio);
    const endDate = new Date(updatedCampaign.dataFim);

    // Verifique se a data de fim é maior que a data de início
    if (endDate <= startDate) {
      throw new Error('A data fim deve ser sempre maior que a data inicio');
    }

    const result = await this.campaignsRepository.update(id, updatedCampaign);

    if (!result) return null;

    return this.campaignsRepository.markExpired(result);
  }

  // Excluir campanha (soft delete)
  async remove(id: string): Promise<void> {
    await this.campaignsRepository.remove(id);
  }
}
