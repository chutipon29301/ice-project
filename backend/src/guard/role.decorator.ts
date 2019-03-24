import { ReflectMetadata } from '@nestjs/common';
import { Role } from '../entities/user.entity';

export const Roles = (...roles: Role[]) => ReflectMetadata('roles', roles);
