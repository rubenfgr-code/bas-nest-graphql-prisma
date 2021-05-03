import { BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FindOneRoleInput } from './input-types/find-one-role.input';
import { UpdateRoleInput } from './input-types/update-role.input';
import { Role } from './object-types/role.entity';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  async createRole(@Args('name', { type: () => String }) name: string) {
    const roleCreated = this.roleService.create({ name });
    return roleCreated;
  }

  @Query(() => [Role], { name: 'roles' })
  async findAll() {
    return this.roleService.findAll();
  }

  @Query(() => Role, { name: 'role', nullable: true })
  async findOneId(
    @Args('findOneRoleInput') findOneRoleInput: FindOneRoleInput,
  ) {
    if (findOneRoleInput) {
      const { id, name } = findOneRoleInput;
      const data: { [k: string]: any } = {};
      id ? (data.id = id) : null;
      name ? (data.name = name) : null;
      return this.roleService.findOne(data);
    }
    throw new BadRequestException('Role id or name is required');
  }

  @Mutation(() => Role)
  async updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    const { id, ...data } = updateRoleInput;
    return this.roleService.update({ where: { id }, data });
  }
}
