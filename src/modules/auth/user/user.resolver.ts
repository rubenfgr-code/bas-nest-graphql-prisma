import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ProfileService } from '../profile/profile.service';
import { RoleService } from '../role/role.service';
import { CreateUserInput } from './dto/create-user.input';
import { FindAllUsersInput } from './dto/find-all-user.input';
import { FindOneUserInput } from './dto/find-one-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly roleService: RoleService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const {
      email,
      emailRepeat,
      password,
      passwordRepeat,
      username,
    } = createUserInput;
    if (email !== emailRepeat) {
      throw new BadRequestException('Emails not equals');
    }
    if (password !== passwordRepeat) {
      throw new BadRequestException('Passwords not equals');
    }
    const foundedRole = await this.roleService.findOne({ id: 1 });
    if (!foundedRole) {
      throw new InternalServerErrorException('Role with id 1 not founded');
    }
    const createdProfile = await this.profileService.create();
    if (!createdProfile) {
      throw new InternalServerErrorException('Created profile error');
    }
    const data: Prisma.UserCreateInput = {
      password,
      email,
      username,
      role: { connect: { id: foundedRole.id } },
      profile: { connect: { id: createdProfile.id } },
    };
    return this.userService.create(data);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(
    @Args('findAllUserInput', { nullable: true })
    findAllUserInput?: FindAllUsersInput,
  ) {
    if (findAllUserInput) {
      const { skip, take, cursor, where, orderBy } = findAllUserInput;
      const data: { [k: string]: any } = {};
      skip ? (data.skip = skip) : null;
      take ? (data.take = take) : null;
      cursor ? (data.cursor = JSON.parse(cursor)) : null;
      where ? (data.where = JSON.parse(where)) : null;
      orderBy ? (data.orderBy = JSON.parse(orderBy)) : null;
      return this.userService.findAll(data);
    }
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('findOneUserInput') findOneUserInput: FindOneUserInput) {
    if (findOneUserInput) {
      const { id, username, email } = findOneUserInput;
      const data: { [k: string]: any } = {};
      id ? (data.id = id) : null;
      username ? (data.username = username) : null;
      email ? (data.email = email) : null;
      return this.userService.findOne(data);
    }
    throw new BadRequestException('User id, username or email is required');
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const { id, roleId, profile, ...res } = updateUserInput;
    const data: Prisma.UserUpdateInput = {
      ...res,
    };
    if (roleId) {
      data.role = { connect: { id: roleId } };
    }
    if (profile) {
      data.profile = { update: { ...profile } };
    }
    return this.userService.update({
      where: { id },
      data,
    });
  }
}
