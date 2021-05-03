import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ProfileModule, RoleModule],
})
export class AuthModule {}
