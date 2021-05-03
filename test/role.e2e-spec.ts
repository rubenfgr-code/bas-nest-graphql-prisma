import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/shared/services/prisma.service';

describe('RoleResolver (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.role.deleteMany({
      where: { name: { startsWith: 'test' } },
    });
    await app.close();
  });

  const gql = '/graphql';

  describe(gql, () => {
    describe('createRole', () => {
      it('should return created role', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: 'mutation {createRole(name:"test") {id name isActive}}',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createRole).toEqual(
              expect.objectContaining({ name: 'test', isActive: true }),
            );
          });
      });
      it('should return unique exception', (done) => {
        return request(app.getHttpServer())
          .post(gql)
          .send({
            query: 'mutation {createRole(name:"test") {id name isActive}}',
          })
          .expect(200, done)
          .expect((res) => {
            expect(JSON.stringify(res.body.errors)).toContain('unique');
          });
      });
    });
    describe('findAll', () => {
      it('should get the cats array', () => {
        return request(app.getHttpServer())
          .post(gql)
          .send({ query: '{roles {id name isActive}}' })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.roles.length).toBe(3);
          });
      });
    });
  });
});
