import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';

config();

const configService = new ConfigService();

export default new DataSource({
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
});
