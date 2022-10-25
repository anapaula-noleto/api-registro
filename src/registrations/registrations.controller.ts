import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { RegistrationsService } from "./registrations.service";

@ApiBearerAuth()
@ApiTags("Register")
@Controller("registrations")
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @ApiOperation({ summary: "Records that the user is in the lab." })
  @Post()
  create(@Body() { userId }: CreateRegistrationDto) {
    return this.registrationsService.create({ userId });
  }

  @Get()
  findAll() {
    return this.registrationsService.findAll();
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.registrationsService.findOne(+id);
  // }
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Records that the user out of the lab." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.registrationsService.remove(id);
  }
}
