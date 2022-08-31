import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      synchronize: true,
      entities: [__dirname + "/infrastructure/*.schema.ts"],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
