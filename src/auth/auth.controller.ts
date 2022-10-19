import { Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { IsPublic } from "./decorators/is-public.decorator";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthRequest } from "./models/AuthRequest";
import { LoginRequestBody } from "./models/LoginRequestBody";

@ApiTags("Authentication")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginRequestBody })
  @Post("login")
  @HttpCode(200)
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
