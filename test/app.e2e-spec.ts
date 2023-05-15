import { PrismaService } from './../src/prisma/prisma.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
//how to open prisma studio on 'TEST' database 'npx dotenv -e .env.test -- prisma studio'
//how to open prisma studio on 'DEV' database 'npx dotenv -e .env -- prisma studio'
const PORT = 3334;
describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.listen(PORT);
    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();
    pactum.request.setBaseUrl(`http://localhost:${PORT}`);
  });
  describe('Test Authentication', () => {
    describe('Register', () => {
      it('should Register', () => {
        return pactum
          .spec()
          .post(`/auth/register`)
          .withBody({
            email: 'test@example.com',
            password: 'testpassword',
          })
          .expectStatus(201);
      });
      it('should show error with empty email', () => {
        return pactum
          .spec()
          .post(`/auth/register`)
          .withBody({
            email: '',
            password: 'testpassword',
          })
          .expectStatus(400);
      });
      it('should show error if password is empty', () => {
        return pactum
          .spec()
          .post(`/auth/register`)
          .withBody({
            email: 'test@example.com',
            password: '',
          })
          .expectStatus(400);
      });
    });
    describe('Login', () => {
      it('should Login', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody({
            email: 'test@example.com',
            password: 'testpassword',
          })
          .expectStatus(201)
          .stores('accessToken', 'accessToken');
      });
    });
    describe('User', () => {
      describe('Get Detail User', () => {
        it('should get detail user', () => {
          return pactum
            .spec()
            .get(`/user/me`)
            .withHeaders({ Authorization: `Bearer $S{accessToken}` })
            .expectStatus(200)
            .inspect();
        });
      });
    });
    //describe('Note', () => {});
    afterAll(async () => {
      app.close();
    });
    it.todo('should PASS, hihi');
  });
});
