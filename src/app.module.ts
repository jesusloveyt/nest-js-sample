import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './models/account.entity';
import { Code } from './models/code.entity';
import { AccountRepository } from './repositories/account.repository';
import { CodeRepository } from './repositories/code.repository';
import { AccountService } from './services/account.service';
import { CodeService } from './services/code.service';
import { AccountController } from './controllers/account.controller';
import { CodeController } from './controllers/code.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Account, Code],
        // synchronize: true, // 개발 환경에서만 true로 설정하세요
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Account, Code]),
  ],
  controllers: [AppController, AccountController, CodeController],
  providers: [AppService, AccountRepository, CodeRepository, AccountService, CodeService],
})
export class AppModule {}
