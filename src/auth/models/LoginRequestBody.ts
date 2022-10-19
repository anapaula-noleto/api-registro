import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginRequestBody {
  @ApiProperty({
    example: "aluno@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "string123_123"
  })
  @IsString()
  password: string;
}
