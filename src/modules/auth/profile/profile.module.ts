import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { SharedModule } from '../../shared/shared.module';
import { GENDER } from './profile-gender.enum';
import { ProfileService } from './profile.service';

@Module({
  imports: [SharedModule],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {
  constructor() {
    registerEnumType(GENDER, { name: 'Gender' });
  }
}
