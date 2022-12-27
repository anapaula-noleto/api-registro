import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bycript from "bcrypt";
import { Promise as Bluebird } from "bluebird";
import { Role } from "src/enums/role.enum";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { CourseExamples } from "./CourseExamples";
import { SeederInterface } from "./seeder.interface";

@Injectable()
export class UsersSeeder implements SeederInterface {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async seed(numberOfSeeds: number): Promise<void> {
    const data: Partial<User>[] = [];

    for (let i = 0; i < numberOfSeeds; i++) {
      data.push({
        id: i,
        name: faker.name.fullName(),
        course: faker.helpers.arrayElement(CourseExamples),
        email: faker.internet.email(),
        password: await bycript.hash("String123", 10),
        photo: faker.internet.avatar(),
        role: i === 0 ? Role.ADMIN : Role.USER,
        activeUser: Math.random() > 0.5 ? true : false
      });
    }

    const adminId = data[0].id;

    for (let i = 1; i < numberOfSeeds; i++) {
      if (data[i].activeUser === true) {
        data[i].addedBy = adminId;
      }
    }
    await Bluebird.each(data, async (data) => {
      await this.usersRepository.insert(data);
    });
  }
}
