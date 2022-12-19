import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { UserPayload } from "./models/UserPayload";
import { UserToken } from "./models/UserToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      activeUser: user.activeUser
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      acess_token: jwtToken
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined
        };
      }
    }
    throw new UnauthorizedException("Invalid e-mail or password.");
  }
}
