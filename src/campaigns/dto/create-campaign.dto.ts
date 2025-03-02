import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({ description: 'Nome da campanha' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'Data de início da campanha',
    example: '2025-03-02T12:00:00'
  })
  @IsDateString()
  @IsNotEmpty()
  dataInicio: string;

  @ApiProperty({
    description: 'Data de término da campanha',
    example: '2025-03-10T12:00:00'
  })
  @IsDateString()
  @IsNotEmpty()
  dataFim: string;

  @ApiProperty({
    description: 'Status da campanha',
    enum: ['ativa', 'pausada', 'expirada'],
    default: 'ativa'
  })
  @IsEnum(['ativa', 'pausada', 'expirada'])
  @IsOptional()
  status?: 'ativa' | 'pausada' | 'expirada' = 'ativa';

  @ApiProperty({ description: 'Categoria da campanha', example: 'Promoção' })
  @IsString()
  @IsNotEmpty()
  categoria: string;
}
