import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect().then(() => {
      console.log('Prisma: DB Online!');
    });
  }

  async onModuleDestroy() {
    await this.$disconnect().then(() => {
      console.log('Prisma: DB Offline!');
    });
  }
}
