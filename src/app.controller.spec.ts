import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig, validate } from './config';
import { DatabaseModule } from './modules/database';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          load: [databaseConfig],
          isGlobal: true,
          validate,
        }),
        DatabaseModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return undefined', () => {
      expect(appController.healthCheck()).toBe(undefined);
    });
  });
});
