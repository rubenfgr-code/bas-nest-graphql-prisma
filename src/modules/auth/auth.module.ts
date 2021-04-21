import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, ProfileModule, RoleModule],
})
export class AuthModule {}
