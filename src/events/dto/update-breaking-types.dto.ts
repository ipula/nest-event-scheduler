import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateBreakingTypesDto {
  @IsOptional()
  breaking_type_name: string;

  @IsOptional()
  breaking_type_start: string;

  @IsOptional()
  breaking_type_end: string;
}
