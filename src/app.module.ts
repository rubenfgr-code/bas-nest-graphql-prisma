import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        buildSchemaOptions: {
          dateScalarMode: 'timestamp',
        },
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
  providers: [AppService],
})
export class AppModule {}
