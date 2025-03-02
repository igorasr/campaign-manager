import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../entities/campaign.entity';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';

@Injectable()
export class CampaignsRepository {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>
  ) {}

  // Criar uma nova campanha
  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = this.campaignRepository.create(createCampaignDto);
    return await this.campaignRepository.save(campaign);
  }

  // Buscar todas as campanhas
  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.find();
  }

  // Buscar campanha por ID
  async findOne(id: string): Promise<Campaign | null> {
    return await this.campaignRepository.findOne({
      where: [{ id: id }]
    });
  }

  // Atualizar uma campanha
  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto
  ): Promise<Campaign | null> {
    await this.campaignRepository.update(id, updateCampaignDto);
    return this.findOne(id); // Retorna a campanha atualizada
  }

  // Excluir uma campanha (soft delete)
  async remove(id: string): Promise<void> {
    await this.campaignRepository.softDelete(id); // Soft delete
  }

  // Marcar campanha como "expirada" se a data final for menor que a data atual
  async markExpired(campaign: Campaign): Promise<Campaign> {
    if (campaign.dataFim < new Date()) {
      campaign.status = 'expirada';
      return await this.campaignRepository.save(campaign);
    }
    return campaign;
  }
}
