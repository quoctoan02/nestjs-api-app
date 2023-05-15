import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }
  cleanDatabase() {
    return this.$transaction([
      //2 command in one transaction
      this.note.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
