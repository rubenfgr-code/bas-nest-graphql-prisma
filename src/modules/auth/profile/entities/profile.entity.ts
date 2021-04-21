import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GENDER } from '../profile-gender.enum';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field(() => GENDER, { nullable: true })
  gender: GENDER;

  @Field(() => Date, { nullable: true })
  birthdate: Date;
}
