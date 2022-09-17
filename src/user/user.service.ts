import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserCreateDto } from './dto/user-create.dto';
import { ConfigService } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    public jwtService: JwtService,
    public configService: ConfigService,
  ) {}

  async signup(userCreateDto: UserCreateDto): Promise<User> {
    const { email, password, user_name, user_type } = userCreateDto;
    // See if email is in use
    const users = await this.userRepository.find({
      where: {
        email,
      },
    });
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it
    const user = await this.userRepository.create({
      email,
      password: result,
      user_name,
      user_type,
    });
    // return & save the user
    return this.userRepository.save(user);
  }

  async signin(userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    //sign jwt authorization token with secret key
    const key = await this.jwtService.signAsync(
      {
        user_type: user.user_type,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        algorithm: 'HS512',
        subject: 'api-key',
      },
    );

    // return jwt token
    return key;
  }
}
