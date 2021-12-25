import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarRepositoryFake } from '@modules/cars/repositories/fakes/CarRepositoryFake';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryFake: ICarRepository;

describe('#CreateCarUseCase', () => {
  beforeEach(() => {
    carsRepositoryFake = new CarRepositoryFake();
    createCarUseCase = new CreateCarUseCase(carsRepositoryFake);
  });

  it('should be able create a new car', async () => {
    const newCar = {
      name: 'Car name test',
      description: 'Car name description',
      brand: 'brand name test',
      license_plate: 'A1235T',
      fine_amount: 0,
      daily_rate: 150,
      category_id: 'category-id-fake',
    };

    const car = await createCarUseCase.execute(newCar);

    expect(car).toHaveProperty('id');
  });
  it('should not be able create a new car with license plate exists', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car name test',
        description: 'Car name description',
        brand: 'brand name test',
        license_plate: 'A1235T',
        fine_amount: 0,
        daily_rate: 150,
        category_id: 'category-id-fake',
      });
      await carsRepositoryFake.create({
        name: 'Car name',
        description: 'Car description',
        brand: 'brand name',
        license_plate: 'A1235T',
        fine_amount: 10,
        daily_rate: 100,
        category_id: 'category-id-fake-test',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Car name description',
      brand: 'brand name test',
      license_plate: 'A1235T',
      fine_amount: 0,
      daily_rate: 150,
      category_id: 'category-id-fake',
    });

    expect(car).toHaveProperty('available', true);
  });
});
