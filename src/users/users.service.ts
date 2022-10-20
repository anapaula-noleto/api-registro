import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateActivationDto } from "./dto/update-activation.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const emailAlreadyExists = await this.findOneByEmail(createUserDto.email);
    if (emailAlreadyExists) throw new BadRequestException("Email in use.");

    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
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

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateActivation(
    id: string,
    updateActivationDto: UpdateActivationDto
  ): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) throw new BadRequestException("User not found");
    if (user.activeUser === updateActivationDto.activeUser) return;
    this.userRepository.update(id, updateActivationDto);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
