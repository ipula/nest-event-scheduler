import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
