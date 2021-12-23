import { CategoriesRepositoryFake } from '@modules/cars/repositories/fakes/CategoriesRepositoryFake';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryFake: CategoriesRepositoryFake;

describe('#CreateCategoryUseCase', () => {
  beforeEach(() => {
    categoriesRepositoryFake = new CategoriesRepositoryFake();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryFake);
  });

  it('should be able to create a new category', async () => {
    const newCategory = {
      name: 'Category name Test',
      description: 'Category description Test',
    };

    await createCategoryUseCase.execute({
      name: newCategory.name,
      description: newCategory.description,
    });

    const category = await categoriesRepositoryFake.findByName(
      newCategory.name
    );

    expect(category.name).toBe(newCategory.name);
    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const newCategory = {
        name: 'Category name Test',
        description: 'Category description Test',
      };

      await createCategoryUseCase.execute({
        name: newCategory.name,
        description: newCategory.description,
      });

      await createCategoryUseCase.execute({
        name: newCategory.name,
        description: newCategory.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
