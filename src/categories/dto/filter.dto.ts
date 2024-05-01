import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterDto {
  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'active',
    description: 'Name to filter by',
  })
  name?: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Description',
    description: 'Description to filter by',
  })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value.trim() === 'true' || value.trim() === '1')
  @ApiPropertyOptional({
    example: true,
    description: 'Filter by active status',
  })
  active?: boolean;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'search query',
    description: 'Search query',
  })
  search?: string;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  @Max(9)
  @ApiPropertyOptional({
    example: 5,
    description: 'Number of items per page',
  })
  pageSize?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number',
  })
  page?: number;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'name',
    description: 'Sort by field',
  })
  sort?: string;
}
