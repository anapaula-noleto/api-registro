import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateActivationDto } from "./dto/update-activation.dto";
import { UsersService } from "./users.service";

@ApiTags("User")
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @Post("signup")
  @ApiOperation({ summary: "Create a new user" })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @ApiBearerAuth()
  @Patch("user/activate/:id")
  updateActivation(
    @Param("id") id: string,
    @Body() updateActivationDto: UpdateActivationDto
  ) {
    return this.usersService.updateActivation(id, updateActivationDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.usersService.remove(+id);
  // }
}
