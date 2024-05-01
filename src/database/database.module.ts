import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfigProvider } from './typeorm.providers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeORMConfigProvider.useFactory,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
}
