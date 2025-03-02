import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  // Criar nova campanha
  @Post()
  async create(
    @Body() createCampaignDto: CreateCampaignDto
  ): Promise<Campaign> {
    return this.campaignsService.create(createCampaignDto);
  }

  // Buscar todas as campanhas
  @Get()
  async findAll(): Promise<Campaign[] | null> {
    return this.campaignsService.findAll();
  }

  // Buscar campanha por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Campaign | null> {
    return this.campaignsService.findOne(id);
  }

  // Atualizar campanha
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto
  ): Promise<Campaign | null> {
    return this.campaignsService.update(id, updateCampaignDto);
  }

  // Excluir campanha (soft delete)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.campaignsService.remove(id);
  }
}
