import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    let userFounded = await this.prismaService.user.findFirst({
      where: { email: { equals: data.email } },
    });
    if (userFounded) {
      throw new BadRequestException('Email exist');
    }
    userFounded = await this.prismaService.user.findFirst({
      where: { username: { equals: data.username } },
    });
    if (userFounded) {
      throw new BadRequestException('Username exist');
    }
    return this.prismaService.user.create({ data });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    return this.prismaService.user.findMany({
      ...params,
      include: { role: true, profile: true },
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return this.prismaService.user.findUnique({ where: userWhereUniqueInput });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { data, where } = params;
    return this.prismaService.user.update({
      data,
      where,
      include: { role: true, profile: true },
    });
  }
}
