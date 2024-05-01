import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../database/entities/category.entity';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private dataSource: DataSource) {
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { slug } = createCategoryDto;
    await this.checkSlug(slug);

    const newCategory: Category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category: Category = await this.categoryRepo.preload({
      id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.checkSlug(category.slug);

    return this.categoryRepo.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryRepo.delete(id);
    if (result.affected === 0) {
      throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(idOrSlug: string): Promise<Category> {
    if (isUUID(idOrSlug)) {
      return this.categoryRepo.findOneBy({ id: idOrSlug });
    } else {
      return this.categoryRepo.findOneBy({ slug: idOrSlug });
    }
  }

  async findAll(filter: FilterDto): Promise<Category[]> {
    let {
      search,
      name,
      description,
      active,
      pageSize = 2,
      page,
      sort = '-createdDate',
    } = filter;
    const queryBuilder = this.categoryRepo.createQueryBuilder('category');
    const replaceYo = (str: string) => str.toLowerCase().replaceAll('ё', 'е');

    if (search) {
      const searchVal: string = replaceYo(search);
      queryBuilder.andWhere(
        '(REPLACE(LOWER(category.name), \'ё\', \'е\') LIKE LOWER(:search) OR REPLACE(LOWER(category.description), \'ё\', \'е\') LIKE LOWER(:search))',
        { search: `%${searchVal}%` });
    } else {
      if (name) {
        const nameVal: string = replaceYo(name);
        queryBuilder.andWhere('REPLACE(LOWER(category.name), \'ё\', \'е\') LIKE LOWER(:name)', { name: `%${nameVal}%` });
      }
      if (description) {
        const descriptionVal: string = replaceYo(description);
        queryBuilder.andWhere(
          'REPLACE(LOWER(category.description), \'ё\', \'е\') LIKE LOWER(:description)',
          { description: `%${descriptionVal}%` });
      }
    }

    if (typeof active === 'boolean') {
      queryBuilder.andWhere('category.active = :active', { active });
    }

    if (!page) page = 1;
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    let sortField: string = sort.startsWith('-') ? sort.slice(1).trim() : sort;
    let sortOrder: 'DESC' | 'ASC' = sort.startsWith('-') ? 'DESC' : 'ASC';

    const metadata = this.dataSource.getMetadata(Category);
    const isColumnExist = metadata.columns.find(column => column.propertyName === sortField);
    if (!isColumnExist) {
      sortField = 'createdDate';
      sortOrder = 'DESC';
    }

    queryBuilder.orderBy(`category.${sortField}`, sortOrder);

    return queryBuilder.getMany();
  }

  private async checkSlug(slug: string): Promise<void> {
    const existSlug = await this.categoryRepo.findOne({ where: { slug } });
    if (existSlug) {
      throw new HttpException('Category with this slug already exists', HttpStatus.CONFLICT);
    }
  }
}
