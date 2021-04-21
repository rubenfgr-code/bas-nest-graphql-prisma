import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GENDER } from '../profile-gender.enum';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => GENDER)
  gender: GENDER;

  @Field(() => Date)
  birthdate: Date;
}
