import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { Registration } from "./entities/registration.entity";
import { FindAllRegistrationsPagination } from "./models/Paginations";
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
  @ApiQuery(FindAllRegistrationsPagination.page)
  @ApiQuery(FindAllRegistrationsPagination.limit)
  @ApiQuery(FindAllRegistrationsPagination.inLabOnly)
  @ApiQuery(FindAllRegistrationsPagination.name)
  findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query("name", new DefaultValuePipe(undefined)) name: string,
    @Query("inLabOnly", new DefaultValuePipe(true), ParseBoolPipe)
    inLabOnly = true
  ): Promise<Pagination<Registration>> {
    limit = limit > 100 ? 100 : limit;
    return this.registrationsService.paginate({
      page,
      limit,
      inLabOnly,
      route: "localhost:3000/registration",
      name
    });
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
