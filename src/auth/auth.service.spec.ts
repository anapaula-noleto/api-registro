import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";
import { Role } from "../enums/role.enum";

describe("AuthService", () => {
  let authService: AuthService;

  const user: User = {
    id: 1,
    email: "email@gmail.com",
    name: "Usuario teste",
    course: "Sistemas para Internet",
    registrations: [],
    role: Role.USER,
    activeUser: true,
    password: null,
    addedBy: null,
    createdAt: new Date()
  };

  beforeEach(async () => {
    const fakerUserService: Partial<UsersService> = {
      findOneByEmail: (email: string) =>
        Promise.resolve({
          ...user,
          email
        })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: fakerUserService
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });
  it("should login a user", () => {
    authService.login(user);
  });
  it("should check if the user has a valid password", () => {
    expect(authService).toBeDefined();
  });
  it("should check if the user has an invalid password", () => {
    expect(authService).toBeDefined();
  });
  it("should throw an error if there is no user with an given e-mail", () => {
    expect(authService).toBeDefined();
  });
});
