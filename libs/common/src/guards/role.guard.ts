import { ROLE_KEY } from '@common/decorators';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private rolesService: RolesService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const userRole = request.user.role;
//     const allowedRoles = await this.rolesService.getRoles();

//     return allowedRoles.includes(userRole);
//   }
// }

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    // private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    return true;
    // const requiredRole = this.reflector.getAllAndOverride<string | Role[]>(
    //   ROLE_KEY,
    //   [context.getHandler(), context.getClass()],
    // );
    // if (!requiredRole) return true;
    // const { user } = context.switchToHttp().getRequest();
    // const allowedRoles = await this.rolesService.getRoles();
    // if (typeof requiredRole === 'string') {
    //   return user.role === requiredRole;
    // } else {
    //   return requiredRole.includes(user.role);
    // }
  }
}
