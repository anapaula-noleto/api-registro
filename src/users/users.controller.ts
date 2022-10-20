import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { IsPublic } from "src/auth/decorators/is-public.decorator";
import { CreateUserDto } from "./dto/create-user.dto";
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

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.usersService.remove(+id);
  // }
}
