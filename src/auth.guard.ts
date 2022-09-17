import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // accessing header field in http request
      const req = context.getArgByIndex(0);
      await this.jwtService.verifyAsync(
        req.headers.authorization.split(' ')[1],
      );
      return true;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Unauthorize',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
