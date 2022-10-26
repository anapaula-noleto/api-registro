import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Promise as Bluebird } from "bluebird";
import { Registration } from "src/registrations/entities/registration.entity";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { SeederInterface } from "./seeder.interface";

@Injectable()
export class RegistrationsSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}
  async seed(): Promise<void> {
    const data: Partial<Registration>[] = [];

    const users = await this.usersRepository.find();

    for (let i = 0; i < 20; i++) {
      data.push({
        user: faker.helpers.arrayElement(users),
        createdAt: faker.date.recent(),
        deletedAt: Math.random() > 0.5 ? faker.date.soon() : null
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.registrationRepository.insert(data);
    });
  }
}
