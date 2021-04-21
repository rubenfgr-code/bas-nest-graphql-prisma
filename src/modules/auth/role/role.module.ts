import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { SharedModule } from 'src/modules/shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
