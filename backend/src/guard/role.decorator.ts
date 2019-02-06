import { ReflectMetadata } from '@nestjs/common';
import { Role } from '../models/users.model';

export const Roles = (...roles: Role[]) => ReflectMetadata('roles', roles);
