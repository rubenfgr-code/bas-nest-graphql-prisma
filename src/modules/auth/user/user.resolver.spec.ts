import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { RoleService } from '../role/role.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        UserService,
        UserResolver,
        RoleService,
        ProfileService,
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    prismaService = module.get<PrismaService>(PrismaService);
    await prismaService.user.createMany({
      data: [
        {
          username: 'test10',
          email: 'test10@test.com',
          password: 'test10',
          roleId: 1,
          profileId: await (await prismaService.profile.create({ data: {} }))
            .id,
        },
        {
          username: 'test11',
          email: 'test11@test.com',
          password: 'test11',
          roleId: 1,
          profileId: await (await prismaService.profile.create({ data: {} }))
            .id,
        },
        {
          username: 'test12',
          email: 'test12@test.com',
          password: 'test12',
          roleId: 1,
          profileId: await (await prismaService.profile.create({ data: {} }))
            .id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prismaService.user.deleteMany({
      where: { email: { startsWith: 'test' } },
    });
    await prismaService.$disconnect();
  });

  describe('createUser', () => {
    it('should return a User created', () => {
      const result = {
        username: 'test',
        email: 'test@gmail.es',
        password: '12345678',
        isActive: true,
      };
      return userResolver
        .createUser({
          username: 'test',
          email: 'test@gmail.es',
          emailRepeat: 'test@gmail.es',
          password: '12345678',
          passwordRepeat: '12345678',
        })
        .then((user) => expect(user).toEqual(expect.objectContaining(result)));
    });

    it('should return a BadRequestException', () => {
      return userResolver
        .createUser({
          username: 'test',
          email: 'test@gmail.es',
          emailRepeat: 'test@gmail.es',
          password: '12345678',
          passwordRepeat: '12345678',
        })
        .catch((error) => expect(error.message).toEqual('Email exist'));
    });

    it('should return a BadRequestException', () => {
      return userResolver
        .createUser({
          username: 'test',
          email: 'test1@gmail.es',
          emailRepeat: 'test1@gmail.es',
          password: '12345678',
          passwordRepeat: '12345678',
        })
        .catch((error) => expect(error.message).toEqual('Username exist'));
    });

    it('should return a BadRequestException', () => {
      return userResolver
        .createUser({
          username: 'test',
          email: 'test@gmail.es',
          emailRepeat: 'test1@gmail.es',
          password: '12345678',
          passwordRepeat: '12345678',
        })
        .catch((error) => expect(error.message).toEqual('Emails not equals'));
    });

    it('should return a BadRequestException', () => {
      return userResolver
        .createUser({
          username: 'test',
          email: 'test1@gmail.es',
          emailRepeat: 'test1@gmail.es',
          password: '1234567',
          passwordRepeat: '12345678',
        })
        .catch((error) =>
          expect(error.message).toEqual('Passwords not equals'),
        );
    });
  });

  describe('findAll', () => {
    it('should return length = 1', () => {
      return userResolver
        .findAll()
        .then((users) => expect(users.length).toBe(5));
    });
    it('should return length = 2', () => {
      return userResolver
        .findAll({ skip: 1, take: 2 })
        .then((users) => expect(users.length).toBe(2));
    });
    it('should return length = 3', () => {
      return userResolver
        .findAll({ skip: 0, take: 4, cursor: JSON.stringify({ id: 2 }) })
        .then((users) => console.log(users));
    });
    it('should return length = 4', () => {
      return userResolver
        .findAll({ where: JSON.stringify({ email: { contains: 'test' } }) })
        .then((users) => expect(users.length).toBe(4));
    });
  });

  describe('findOne', () => {
    it('should return username = test10', () => {
      return userResolver
        .findOne({ email: 'test10@test.com' })
        .then((user) =>
          expect(user).toEqual(expect.objectContaining({ username: 'test10' })),
        );
    });
  });

  describe('updateUser', () => {
    it('should return {id: 1, username: "tesetUPDATED"}', () => {
      return userResolver
        .updateUser({ id: 1, username: 'testUPDATED' })
        .then((user) =>
          expect(user).toEqual(
            expect.objectContaining({ id: 1, username: 'testUPDATED' }),
          ),
        );
    });
    it('should return {id: 1, roleId: 1}', () => {
      return userResolver
        .updateUser({ id: 1, roleId: 1 })
        .then((user) =>
          expect(user).toEqual(expect.objectContaining({ id: 1, roleId: 1 })),
        );
    });
  });
});
