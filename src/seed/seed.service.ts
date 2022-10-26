import { Injectable, Logger } from "@nestjs/common";
import { Promise as Bluebird } from "bluebird";
import { DataSource } from "typeorm";
import { RegistrationsSeeder } from "./registrations.seeder";
import { SeederInterface } from "./seeder.interface";
import { UsersSeeder } from "./users.seeder";

@Injectable()
export class SeedService {
  private readonly seeders: SeederInterface[] = [];
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly registrationsSeeder: RegistrationsSeeder,
    private readonly usersSeeder: UsersSeeder
  ) {
    this.seeders = [this.usersSeeder, this.registrationsSeeder];
  }

  async seed() {
    await this.dataSource.synchronize(true);

    await Bluebird.each(this.seeders, async (seeder: SeederInterface) => {
      this.logger.log(`Seeding ${seeder.constructor.name}`);
      await seeder.seed(20);
    });
  }
}
