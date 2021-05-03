import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  // ==================================================
  //  IMPORTS
  // ==================================================
  imports: [
    // ----------------------------
    //  ConfigModule
    // ----------------------------
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    // ----------------------------
    //  GraphQLModule
    // ----------------------------
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(
          process.cwd(),
          configService.get<string>('GRAPHQL_SCHEMAFILE'),
        ),
        sortSchema: configService.get<boolean>('GRAPHQL_SORTSCHEMA'),
      }),
      inject: [ConfigService],
    }),

    // ----------------------------
    //  Other Modules
    // ----------------------------
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ==================================================
    //  Validation Global Pipes
    // ==================================================
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          disableErrorMessages: false,
        }),
    },
  ],
})
export class AppModule {}
