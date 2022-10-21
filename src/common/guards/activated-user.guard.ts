import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class ActiveUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.activeUser !== undefined) {
      return true;
    }
    console.log("==========================user not active");
    return false;
  }
}
