import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";

export class UpdateActivationDto {
  @ApiProperty()
  @IsUUID("4")
  addedBy: string;

  @ApiProperty()
  @IsBoolean()
  activeUser: boolean;
}
