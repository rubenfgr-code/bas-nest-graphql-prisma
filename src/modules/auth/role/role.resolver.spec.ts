import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/services/prisma.service';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';
import('dotenv').then((dotenv) => dotenv.config());

describe('RoleResolver', () => {
  let roleResolver: RoleResolver;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleResolver, RoleService, PrismaService],
    }).compile();

    roleResolver = module.get<RoleResolver>(RoleResolver);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.role.deleteMany({
      where: { name: { startsWith: 'test' } },
    });
    await prismaService.$disconnect();
  });

  describe('createRole', () => {
    it('should return a Role created', async () => {
      await expect(roleResolver.createRole('test')).resolves.toEqual(
        expect.objectContaining({ name: 'test', isActive: true }),
      );
    });
  });

  describe('createRoleUnique', () => {
    it('should return name: test', async () => {
      await expect(() => roleResolver.createRole('test')).rejects.toThrow(
        'Unique constraint failed on the constraint: `name_unique`',
      );
    });
  });

  describe('findAll', () => {
    it('should return length 3', async () => {
      roleResolver.findAll().then((roles) => expect(roles.length).toBe(3));
    });
  });

  describe('findOne', () => {
    it('should return length 1', async () => {
      await expect(roleResolver.findOneId({ id: 1 })).resolves.toEqual(
        expect.objectContaining({ name: 'ADMIN' }),
      );
      await expect(roleResolver.findOneId({ name: 'NONE' })).resolves.toEqual(
        expect.objectContaining({ id: 2 }),
      );
    });
  });

  describe('updateRole', () => {
    it('should return name: test, isActive: false', async () => {
      const role = await roleResolver.findOneId({ name: 'test' });
      await expect(
        roleResolver.updateRole({
          id: role.id,
          name: 'test2',
          isActive: false,
        }),
      ).resolves.toEqual({ id: role.id, name: 'test2', isActive: false });
    });
  });
});
