import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignDto } from './create-campaign.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {}
