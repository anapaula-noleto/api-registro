import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateRegistrationDto {
  @ApiProperty()
  @IsUUID("4")
  userId: string;
}
