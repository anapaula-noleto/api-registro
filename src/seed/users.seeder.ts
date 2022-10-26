import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bycript from "bcrypt";
import { Promise as Bluebird } from "bluebird";
import { Registration } from "src/registrations/entities/registration.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { SeederInterface } from "./seeder.interface";

@Injectable()
export class UsersSeeder implements SeederInterface {
  constructor(
    @InjectRepository(Registration)
    private readonly usersRepository: Repository<User>
  ) {}
  async seed(): Promise<void> {
    const data: Partial<CreateUserDto>[] = [];

    for (let i = 0; i < 20; i++) {
      data.push({
        name: faker.name.fullName(),
        course: faker.lorem.word(),
        email: faker.internet.email(),
        password: await bycript.hash(faker.internet.password(), 10),
        photo: faker.internet.avatar()
      });
    }

    await Bluebird.each(data, async (data) => {
      await this.usersRepository.insert(data);
    });
  }
}
