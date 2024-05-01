import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '../database/entities/category.entity';
import { FilterDto } from './dto/filter.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }

  @Get(':idOrSlug')
  findOne(@Param('idOrSlug') idOrSlug: string): Promise<Category> {
    return this.categoriesService.findOne(idOrSlug);
  }

  @Get()
  findAll(@Query() filterDto: FilterDto): Promise<Category[]> {
    return this.categoriesService.findAll(filterDto);
  }
}
