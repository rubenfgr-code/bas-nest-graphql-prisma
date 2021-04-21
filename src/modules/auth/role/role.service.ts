import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/modules/shared/services/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prismaService: PrismaService) {}
  create(data: Prisma.RoleCreateInput) {
    return this.prismaService.role.create({ data });
  }

  async roles(
    skip?: number,
    take?: number,
    cursor?: Prisma.RoleWhereUniqueInput,
    where?: Prisma.RoleWhereInput,
    orderBy?: Prisma.RoleOrderByInput,
  ): Promise<Role[]> {
    return this.prismaService.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async role(
    roleWhereUniqueInput: Prisma.RoleWhereUniqueInput,
  ): Promise<Role | null> {
    return this.prismaService.role.findFirst({ where: roleWhereUniqueInput });
  }

  async update(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { data, where } = params;
    return this.prismaService.role.update({ data, where });
  }
}
