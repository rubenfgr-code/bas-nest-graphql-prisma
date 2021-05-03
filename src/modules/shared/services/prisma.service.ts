import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
    this.role.findUnique({ where: { id: 1 } }).then(async (role) => {
      if (!role) {
        await this.role.create({ data: { name: 'ADMIN' } });
      }
    });
    this.role.findUnique({ where: { id: 2 } }).then(async (role) => {
      if (!role) {
        await this.role.create({ data: { name: 'NONE' } });
      }
    });
    this.user.findUnique({ where: { id: 1 } }).then(async (user) => {
      if (!user) {
        await this.user.create({
          data: {
            username: 'admin',
            email: 'admin@start.com',
            password: bcrypt.hashSync('admin', bcrypt.genSaltSync()),
            profile: { create: {} },
            role: { connect: { id: 1 } },
          },
        });
      }
    });
  }

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

  /* async dropDatabase(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const propertyNames = Object.getOwnPropertyNames(this);
      for await (const pn of propertyNames) {
        if (this[pn] && this[pn]['deleteMany']) {
          try {
            const pnCapitalized =
              pn.charAt(0).toLocaleUpperCase() + pn.slice(1);
            await this.$transaction([
              this.$executeRaw(`DELETE FROM ${pnCapitalized};`),
              this.$executeRaw(
                `ALTER TABLE ${pnCapitalized} AUTO_INCREMENT=1;`,
              ),
            ]);
          } catch (error) {
            reject(error);
          }
        }
      }
      resolve();
    });
  } */
}
