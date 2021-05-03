import { Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(): Promise<Profile> {
    return this.prismaService.profile.create({ data: {} });
  }

  async findOne(id: number): Promise<Profile> {
    return this.prismaService.profile.findUnique({ where: { id } });
  }

  async update(id: number, profileUpdateInput: Prisma.ProfileUpdateInput) {
    return this.prismaService.profile.update({
      where: { id },
      data: profileUpdateInput,
    });
  }
}
