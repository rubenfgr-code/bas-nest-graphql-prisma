import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { registerEnumType } from '@nestjs/graphql';
import { GENDER } from './profile-gender.enum';

@Module({
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {
  constructor() {
    registerEnumType(GENDER, { name: 'Gender' });
  }
}
