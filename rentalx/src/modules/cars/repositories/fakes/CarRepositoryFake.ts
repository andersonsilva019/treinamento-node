import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarRepository } from '../ICarRepository';

export class CarRepositoryFake implements ICarRepository {
  private cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    license_plate,
    category_id,
    daily_rate,
    fine_amount,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      license_plate,
      category_id,
      daily_rate,
      fine_amount,
    });

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}
