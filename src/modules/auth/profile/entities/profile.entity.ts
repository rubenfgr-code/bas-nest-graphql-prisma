import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { GENDER } from '../profile-gender.enum';

@ObjectType()
export class Profile {
  @Field(() => User)
  user: User;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => GENDER)
  gender: GENDER;

  @Field(() => Date)
  birthdate: Date;
}
