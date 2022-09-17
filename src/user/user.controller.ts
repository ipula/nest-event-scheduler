import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signup(@Body() userCreateDto: UserCreateDto): Promise<any> {
    return this.userService.signup(userCreateDto);
  }

  @Post('/signin')
  async signin(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return {
      message: 'login success !',
      token: await this.userService.signin(userLoginDto),
    };
  }
}
