import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateCampaignDto {
  @ApiProperty({ description: 'Nome da campanha', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Data de início da campanha',
    required: false,
    example: '2025-03-02T12:00:00'
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'Data de término da campanha',
    required: false,
    example: '2025-03-10T12:00:00'
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Status da campanha',
    enum: ['ativa', 'pausada', 'expirada'],
    required: false
  })
  @IsEnum(['ativa', 'pausada', 'expirada'])
  @IsOptional()
  status?: 'ativa' | 'pausada' | 'expirada';

  @ApiProperty({ description: 'Categoria da campanha', required: false })
  @IsString()
  @IsOptional()
  category?: string;
}
