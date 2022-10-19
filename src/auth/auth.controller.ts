import { Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  login() {
    return "login";
  }
}
