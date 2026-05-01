import { SetMetadata } from '@nestjs/common';

export const CheckAccess = (relation: string, resource: string) =>
  SetMetadata('check_access', { relation, resource });