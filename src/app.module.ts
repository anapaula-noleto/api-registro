import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RegistrationsModule } from "./registrations/registrations.module";
import { Registration } from "./registrations/entities/registration.entity";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";

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
    UsersModule,
    RegistrationsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
