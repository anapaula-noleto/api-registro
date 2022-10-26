import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Registration } from "../registrations/entities/registration.entity";
import { User } from "../users/entities/user.entity";
import { RegistrationsSeeder } from "./registrations.seeder";
import { SeedService } from "./seed.service";
import { UsersSeeder } from "./users.seeder";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: +configService.get<number>("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [User, Registration],
        synchronize: true,
        logging: true
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Registration, User])
  ],
  controllers: [],
  providers: [SeedService, RegistrationsSeeder, UsersSeeder]
})
export class SeedModule {}
