import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

describe('CampaignsController', () => {
  let controller: CampaignsController;
  let service: CampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        {
          provide: CampaignsService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({ id: '1', ...new CreateCampaignDto() }),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest
              .fn()
              .mockResolvedValue({ id: '1', ...new CreateCampaignDto() }),
            update: jest
              .fn()
              .mockResolvedValue({ id: '1', ...new UpdateCampaignDto() }),
            remove: jest.fn().mockResolvedValue(null)
          }
        }
      ]
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
    service = module.get<CampaignsService>(CampaignsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a campaign', async () => {
    const createCampaignDto = new CreateCampaignDto();
    const result = await controller.create(createCampaignDto);
    expect(result).toHaveProperty('id');
    expect(result.nome).toBe(createCampaignDto.nome);
  });

  it('should return all campaigns', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
  });

  it('should return a campaign by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toHaveProperty('id', '1');
  });

  it('should update a campaign', async () => {
    const updateCampaignDto = new UpdateCampaignDto();
    const result = await controller.update('1', updateCampaignDto);
    expect(result).toHaveProperty('id', '1');
  });

  it('should delete a campaign', async () => {
    const result = await controller.remove('1');
    expect(result).toBeNull();
  });
});
