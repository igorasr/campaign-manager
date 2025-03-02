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
    const campaign = await this.campaignsRepository.create(createCampaignDto);
    return this.campaignsRepository.markExpired(campaign);
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
    if (!(await this.campaignsRepository.findOne(id))) return null;

    const campaign = await this.campaignsRepository.update(
      id,
      updateCampaignDto
    );

    if (!campaign) return null;

    return this.campaignsRepository.markExpired(campaign);
  }

  // Excluir campanha (soft delete)
  async remove(id: string): Promise<void> {
    await this.campaignsRepository.remove(id);
  }
}
