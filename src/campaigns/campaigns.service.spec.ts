import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsService } from './campaigns.service';
import { CampaignsRepository } from './repositories/campaigns.repository';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

describe('CampaignsService', () => {
  let service: CampaignsService;

  const today = new Date(); // Hoje
  const tomorrow = new Date(today.getDate() + 1); // Data no Futuro

  const FAKE_CAMPAIGN = {
    id: '1',
    nome: 'Campanha Teste',
    dataInicio: today,
    dataFim: tomorrow,
    categoria: 'Promoção',
    status: 'ativa'
  };

  const mockCampaignsRepository = {
    create: jest.fn().mockResolvedValue(FAKE_CAMPAIGN),
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(FAKE_CAMPAIGN),
    update: jest.fn((campaing: UpdateCampaignDto) => {
      const updated = {
        ...FAKE_CAMPAIGN,
        ...campaing,
        dataInicio: campaing.dataInicio || FAKE_CAMPAIGN.dataInicio,
        dataFim: campaing.dataFim || FAKE_CAMPAIGN.dataFim
      };

      return updated;
    }),
    remove: jest.fn().mockResolvedValue(null),
    markExpired: jest.fn((campaign: Campaign): Campaign => {
      if (campaign.dataFim < new Date()) {
        campaign.status = 'expirada';
      }

      return campaign;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignsService,
        {
          provide: CampaignsRepository,
          useValue: mockCampaignsRepository
        }
      ]
    }).compile();

    service = module.get<CampaignsService>(CampaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a campaign', async () => {
      const createCampaignDto = new CreateCampaignDto();
      const result = await service.create(createCampaignDto);
      expect(result).toHaveProperty('id');
    });

    it('should throw an error if endDate is not greater than startDate', async () => {
      const createCampaignDto: CreateCampaignDto = {
        nome: 'Campanha Teste',
        dataInicio: '2025-03-10T12:00:00',
        dataFim: '2025-03-09T12:00:00',
        categoria: 'Promoção'
      };

      await expect(service.create(createCampaignDto)).rejects.toThrow(
        'A data fim deve ser sempre maior que a data inicio'
      );
    });

    it('should throw an error if startDate is before the current date', async () => {
      const createCampaignDto: CreateCampaignDto = {
        nome: 'Campanha Teste',
        dataInicio: '2023-03-02T12:00:00', // Data no passado
        dataFim: '2025-03-10T12:00:00',
        categoria: 'Promoção'
      };

      await expect(service.create(createCampaignDto)).rejects.toThrow(
        'A data de início deve ser igual ou posterior à data atual'
      );
    });
  });

  describe('Search', () => {
    it('should return all campaigns', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
    });

    it('should return a campaign by id', async () => {
      const result = await service.findOne('1');
      expect(result).toHaveProperty('id', '1');
    });
  });

  describe('Update', () => {
    it('should update a campaign', async () => {
      let updateCampaignDto = new UpdateCampaignDto();
      const lastDay = new Date();
      const tomorrow = new Date(lastDay);
      tomorrow.setDate(tomorrow.getDate() + 5);

      updateCampaignDto = {
        ...updateCampaignDto,
        nome: 'Alterado',
        dataInicio: lastDay.toISOString(),
        dataFim: tomorrow.toISOString()
      };

      const result = await service.update('1', updateCampaignDto);

      expect(result).toHaveProperty('id', '1');
    });

    it('must be marked as "expirada" if the end date is less than the current date', async () => {
      const lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 10);
      const tomorrow = new Date(lastDay);
      tomorrow.setDate(tomorrow.getDate() + 5);

      const updateCampaignDto: UpdateCampaignDto = {
        dataInicio: lastDay.toISOString(),
        dataFim: tomorrow.toISOString(), // Data no passado
        status: 'ativa'
      };

      const result = await service.update('1', updateCampaignDto);
      // Verifica se a campanha foi marcada como "expirada"
      expect(result).toHaveProperty('status', 'expirada');
      expect(mockCampaignsRepository.markExpired).toHaveBeenCalledWith(result); // Verifica se o mock foi chamado
    });
  });

  describe('Delete', () => {
    it('should delete a campaign', async () => {
      const result = await service.remove('1');
      expect(result).toBeUndefined();
    });
  });
});
