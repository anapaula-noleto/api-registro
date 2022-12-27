import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiTags
} from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { IdParameter } from "src/common/models/IdParameter";
import { Role } from "../enums/role.enum";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateActivationDto } from "./dto/update-activation.dto";
import { UsersService } from "./users.service";

class ActiveUserDTO {
  @IsBoolean()
  @ApiProperty()
  activeUser: boolean;
}

@ApiTags("User")
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post("signup")
  @ApiOperation({ summary: "Create a new user." })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: number) {
  //   return this.usersService.findOne(+id);
  // }

  @ApiBearerAuth()
  @ApiParam({ type: String, name: "id" })
  @ApiOperation({
    summary: "Activates or deactivates a user. Only admins can use this route."
  })
  @Patch("user/activate/:id")
  @Roles(Role.ADMIN)
  updateActivation(
    @Param("id") idParameter: IdParameter,
    @Body() activeUserDTO: ActiveUserDTO,
    @CurrentUser("id") adminId: number
  ) {
    const updateActivationDto: UpdateActivationDto = {
      activeUser: activeUserDTO.activeUser,
      addedBy: adminId
    };
    console.log(updateActivationDto);
    console.log(IdParameter);
    return this.usersService.updateActivation(
      idParameter as unknown as number,
      updateActivationDto
    );
  }

  // @Delete(":id")
  // remove(@Param("id") id: number) {
  //   return this.usersService.remove(+id);
  // }
}
