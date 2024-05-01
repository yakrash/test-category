import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

export const testDatabaseProviders = [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    entities: [Category],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Category]),
];
