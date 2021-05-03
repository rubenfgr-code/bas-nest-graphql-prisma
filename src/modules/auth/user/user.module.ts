import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { ProfileModule } from '../profile/profile.module';
import { RoleModule } from '../role/role.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [SharedModule, RoleModule, ProfileModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
