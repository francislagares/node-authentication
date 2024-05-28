import { RegisterUserDto } from '@/domain/dtos/auth/register-user.dto';
import { User } from '@/domain/entities/user';

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<User>;
}
