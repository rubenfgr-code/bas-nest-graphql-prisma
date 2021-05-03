import { Module } from '@nestjs/common';
import { DateScalar } from './scalars/date.scalar';
import { PrismaService } from './services/prisma.service';

@Module({
  providers: [PrismaService, DateScalar],
  exports: [PrismaService, DateScalar],
})
export class SharedModule {}
