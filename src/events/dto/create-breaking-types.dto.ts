import { IsNotEmpty } from '@nestjs/class-validator';
export class CreateBreakingTypesDto {
  @IsNotEmpty()
  breaking_type_name: string;

  @IsNotEmpty()
  breaking_type_start: string;

  @IsNotEmpty()
  breaking_type_end: string;
}
