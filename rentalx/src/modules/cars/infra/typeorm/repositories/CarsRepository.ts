import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { license_plate },
    });

    return car;
  }
  async create({
    name,
    description,
    license_plate,
    brand,
    category_id,
    fine_amount,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      brand,
      category_id,
      fine_amount,
      daily_rate,
    });

    await this.repository.save(car);

    return car;
  }
}
