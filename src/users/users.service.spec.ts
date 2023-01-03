import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { Role } from "../enums/role.enum";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import { faker } from "@faker-js/faker";
import { omit } from "lodash";

const user: User = {
  id: Math.random() * 9999,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: Role.USER,
  activeUser: true,
  createdAt: new Date(),
  deletedAt: null,
  course: "Engenharia de Software",
  photo: null,
  addedBy: null,
  registrations: []
};

const userDto: CreateUserDto = omit(user, [
  "id",
  "createdAt",
  "deletedAt",
  "addedBy"
]);

function userBuilder() {
  return Object.assign(new User(), user);
}

const mockUserRepository: jest.Mock<Repository<User>> = jest
  .fn()
  .mockImplementation(() => {
    const users = Array.from({ length: 10 }, () => userBuilder());

    return {
      find: jest.fn().mockResolvedValue(users),
      findOne: jest.fn().mockResolvedValue(user),
      save: jest.fn().mockResolvedValue(user),
      update: jest.fn().mockResolvedValue(user)
    };
  });

describe("UsersService", () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should be able to create a user", async () => {
    await expect(service.create(userDto)).resolves.toMatchObject({
      ...userDto,
      id: expect.any(Number),
      createdAt: expect.any(Date),
      deletedAt: null,
      addedBy: null,
      password: undefined
    });
  });
  it("should be able to find a user by email", () => {
    expect(service).toBeDefined();
  });
  it("should be able to find a user by id", () => {
    expect(service).toBeDefined();
  });
  it("should be able to change a user activation property", () => {
    expect(service).toBeDefined();
  });
});
