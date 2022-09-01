import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './presenter/modules/user_module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      entities: [__dirname + "/infrastructure/*.schema.ts"],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
