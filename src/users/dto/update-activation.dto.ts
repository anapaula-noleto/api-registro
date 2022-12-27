import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsUUID } from "class-validator";

export class UpdateActivationDto {
  @ApiProperty()
  @IsNumber()
  addedBy: number;

  @ApiProperty()
  @IsBoolean()
  activeUser: boolean;
}
