import { IsBoolean, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'animals',
    description: 'Unique slug for the category. Slug should contain only English letters',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Slug should contain only English letters',
  })
  slug!: string;

  @ApiProperty({
    example: 'Cat',
    description: 'The name of the category',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, {
    message: 'Name should contain only English and Cyrillic letters',
  })
  name!: string;

  @ApiPropertyOptional({
    example: 'description',
    description: 'The description of the category',
  })
  @IsString()
  @Matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, {
    message: 'Description should contain only English and Cyrillic letters',
  })
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates whether the category is active or not.',
  })
  @IsBoolean()
  @IsNotEmpty()
  active!: boolean;
}
