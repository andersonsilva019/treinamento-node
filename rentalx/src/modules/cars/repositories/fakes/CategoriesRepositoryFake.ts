import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

export class CategoriesRepositoryFake implements ICategoriesRepository {
  private categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
