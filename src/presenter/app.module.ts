import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from '@/presenter/modules/appointment_module';
import { UserModule } from '@/presenter/modules/user_module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration, { DbConfig, ENV_DB_CONFIG_KEY } from '@/infra/database/typeorm/database.config';
import authConfiguration from '@/infra/configurations/authentication.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration, authConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<DbConfig>(ENV_DB_CONFIG_KEY),
      })
    }),
    UserModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
