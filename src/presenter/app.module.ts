import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './modules/user_module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      entities: [join(__dirname, '..', 'infrastructure', '**', '*_schema{.ts,.js}')]
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
