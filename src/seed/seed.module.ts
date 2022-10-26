import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Registration } from "../registrations/entities/registration.entity";
import { User } from "../users/entities/user.entity";
import { RegistrationsSeeder } from "./registrations.seeder";
import { SeedService } from "./seed.service";
import { UsersSeeder } from "./users.seeder";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      entities: [__dirname + "/../**/*.entity{.ts,.js}"]
    }),
    TypeOrmModule.forFeature([Registration, User])
  ],
  controllers: [],
  providers: [SeedService, RegistrationsSeeder, UsersSeeder]
})
export class SeedModule {}
