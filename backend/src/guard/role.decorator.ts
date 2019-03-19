import { ReflectMetadata } from '@nestjs/common';
import { Role } from 'src/entities/user.entity';

export const Roles = (...roles: Role[]) => ReflectMetadata('roles', roles);
