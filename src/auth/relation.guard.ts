import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RelationService } from 'src/relation/relation.service';

@Injectable()
export class RelationGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private relation: RelationService
  ) {}

  async canActivate(ctx: ExecutionContext) {

    const meta = this.reflector.get('access', ctx.getHandler());
    if (!meta) return true;

    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.userId;
    const id = req.params.id;

    const isAllowed = await this.relation.checkAccess(
      `USER:${userId}`,
      meta.relation,
      `${meta.resource}:${id}`
    );

    if (!isAllowed) throw new ForbiddenException();

    return true;
  }
}