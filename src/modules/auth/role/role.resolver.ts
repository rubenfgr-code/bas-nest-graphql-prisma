import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('name', { type: () => String }) name: string) {
    return this.roleService.create({ name });
  }

  @Query(() => [Role], { name: 'roles' })
  findAll() {
    return this.roleService.roles();
  }

  @Query(() => Role, { name: 'role' })
  findOneId(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.role({ id });
  }

  @Mutation(() => Role)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    const { id, ...data } = updateRoleInput;
    return this.roleService.update({ where: { id }, data });
  }
}
