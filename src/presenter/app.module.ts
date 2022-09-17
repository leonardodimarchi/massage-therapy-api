import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from '@/presenter/modules/appointment_module';
import { UserModule } from '@/presenter/modules/user_module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration from '@/infra/database/configuration/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      })
    }),
    UserModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
