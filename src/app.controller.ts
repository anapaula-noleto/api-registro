import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { CurrentUser } from "./auth/decorators/current-user.decorator";
import { User } from "./users/entities/user.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBearerAuth()
  @Get("me")
  @ApiOperation({ summary: "Get data about the current user" })
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
