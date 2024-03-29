import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    const { file } = request;
    await importCategoryUseCase.execute(file);
    return response.send();
  }
}
