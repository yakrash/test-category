import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Category } from '../database/entities/category.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { testDatabaseProviders } from '../database/test-db';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ...testDatabaseProviders,
      ],
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    dataSource = module.get<DataSource>(getDataSourceToken());

    const entityManager = dataSource.manager;
    const category1 = entityManager.create(Category, {
      slug: 'Wooden',
      name: 'Мёд',
      description: 'description',
      active: true,
    });
    const category2 = entityManager.create(Category, {
      slug: 'Shirt',
      name: 'Second',
      description: 'Лёд',
      active: true,
    });
    const category3 = entityManager.create(Category, {
      slug: 'Car',
      name: 'Third',
      description: 'Костёр',
      active: false,
    });
    const category4 = entityManager.create(Category, {
      slug: 'Animal',
      name: 'Fourth',
      description: 'Gold',
      active: true,
    });
    await entityManager.save([category1, category2, category3, category4]);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('findAll', () => {
    it('should return all resultName', async () => {

      const resultName = await service.findAll({ name: 'е', pageSize: 9 });
      expect(resultName).toHaveLength(1);
    });

    it('should return all resultDescription', async () => {

      const resultDescription = await service.findAll({ description: 'е', pageSize: 9 });
      expect(resultDescription).toHaveLength(2);
    });

    it('should return all resultActive', async () => {

      const resultActive = await service.findAll({ description: 'е', active: false, pageSize: 9 });
      expect(resultActive).toHaveLength(1);
    });

    it('should return all resultSearch', async () => {

      const resultSearch = await service.findAll({ name: 'Second', description: 'Gold', search: `ё`, pageSize: 9 });
      expect(resultSearch).toHaveLength(3);
    });

    it('should return all resultSearch with pageSize: 2', async () => {

      const resultPageSize = await service.findAll({ name: 'Second', description: 'Gold', search: `ё`, pageSize: 2 });
      expect(resultPageSize).toHaveLength(2);
    });

    it('should handle invalid sort field', async () => {
      const result = await service.findAll({ sort: '-invalidField', pageSize: 3 });
      expect(result[0].createdDate.getTime()).toBeLessThanOrEqual(result[1].createdDate.getTime());
      expect(result[1].createdDate.getTime()).toBeLessThanOrEqual(result[2].createdDate.getTime());
    });
  });

});
