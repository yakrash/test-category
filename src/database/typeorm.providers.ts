import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeORMConfigProvider = {
  provide: 'TYPEORM_CONNECTION',
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_DATABASE'),
    password: configService.get<string>('DB_PASSWORD'),
    username: configService.get<string>('DB_USERNAME'),
    logging: configService.get('TYPEORM_LOGGING') === 'true',
    synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
    entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './migrations/*{.ts,.js}')],
    ssl: false,
  }),
  inject: [ConfigService],
};
