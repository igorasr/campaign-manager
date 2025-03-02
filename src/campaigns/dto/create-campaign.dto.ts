import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  @IsNotEmpty()
  dataInicio: string;

  @IsDateString()
  @IsNotEmpty()
  dataFim: string;

  @IsEnum(['ativa', 'pausada', 'expirada'])
  status: 'ativa' | 'pausada' | 'expirada';

  @IsString()
  @IsNotEmpty()
  categoria: string;
}
