import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "@users/users.service";
import { Repository } from "typeorm";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { Registration } from "./entities/registration.entity";

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
    private readonly usersService: UsersService
  ) {}

  async create({ userId }: CreateRegistrationDto) {
    const openRegistration = await this.findOpenRegistration(userId);
    if (openRegistration) {
      throw new BadRequestException("The user is already logged in the lab.");
    }
    const user = await this.usersService.findOneById(userId);
    if (!user) throw new BadRequestException("User not found.");

    this.registrationRepository.save({ user });
  }

  async findAll() {
    return await this.registrationRepository.find({ withDeleted: true });
  }

  findOpenRegistration(userId: string) {
    return this.registrationRepository.findOne({
      loadRelationIds: true,
      where: {
        user: {
          id: userId
        },
        deletedAt: null
      }
    });
  }

  // update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
  //   return `This action updates a #${id} registration`;
  // }

  async remove(userId: string) {
    const openRegistration = await this.findOpenRegistration(userId);
    if (!openRegistration) {
      throw new BadRequestException("The user is not logged in the lab.");
    }
    await this.registrationRepository.softDelete(openRegistration.id);
  }
}
