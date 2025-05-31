import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Account } from './models/account.entity';
import { Code } from './models/code.entity';
import { File } from './models/file.entity';
import { Board } from './models/board.entity';
import { AccountRepository } from './repositories/account.repository';
import { CodeRepository } from './repositories/code.repository';
import { FileRepository } from './repositories/file.repository';
import { BoardRepository } from './repositories/board.repository';
import { AccountService } from './services/account.service';
import { CodeService } from './services/code.service';
import { FileService } from './services/file.service';
import { BoardService } from './services/board.service';
import { AccountController } from './controllers/account.controller';
import { CodeController } from './controllers/code.controller';
import { FileController } from './controllers/file.controller';
import { BoardController } from './controllers/board.controller';

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
        entities: [Account, Code, File, Board],
        // synchronize: true, // 개발 환경에서만 true로 설정하세요
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Account, Code, File, Board]),
  ],
  controllers: [AppController, AccountController, CodeController, FileController, BoardController],
  providers: [
    AppService,
    AccountRepository,
    CodeRepository,
    FileRepository,
    BoardRepository,
    AccountService,
    CodeService,
    FileService,
    BoardService,
  ],
})
export class AppModule {}
