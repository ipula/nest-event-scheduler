import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  private JWT_SECRET: any;
  constructor(private configService: ConfigService) {
    this.JWT_SECRET = this.configService.get('JWT_SECRET');
  }
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.JWT_SECRET,
    };
  }
}
