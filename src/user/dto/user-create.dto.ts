import { IsNotEmpty } from '@nestjs/class-validator';
export class UserCreateDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  user_type: boolean;
}
