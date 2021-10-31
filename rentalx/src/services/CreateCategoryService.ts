import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryService {
  constructor(private categoryRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExist = this.categoryRepository.findByName(name);

    if (categoryAlreadyExist) {
      throw new Error('Category already exists!');
    }

    this.categoryRepository.create({ name, description });
  }
}
