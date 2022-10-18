import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const emailAlreadyExists = await this.findOneByEmail(createUserDto.email);
    if (emailAlreadyExists) throw new BadRequestException("Email in use.");

    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      addedBy: "sfdfkdkslf"
    };

    const createUser = await this.userRepository.save(user);

    return {
      ...createUser,
      password: undefined
    };
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
