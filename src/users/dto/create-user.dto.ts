import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Joe Doe"
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "aluno@gmail.com",
    description: "The email must be unique."
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "String123",
    description:
      "The password must have at least a letter, a number and eight characters. Maximum 20 characters allowed."
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: "password too weak"
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({
    example: "Engenharia Elétrica"
  })
  @IsString()
  course: string;
}
