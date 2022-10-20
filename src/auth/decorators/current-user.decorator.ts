import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequest } from "../models/AuthRequest";

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    const user = request.user;

    return data ? user?.[data] : user;
  }
);
