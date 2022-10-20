import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { CurrentUser } from "./auth/decorators/current-user.decorator";
import { User } from "./users/entities/user.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @Get("me")
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
