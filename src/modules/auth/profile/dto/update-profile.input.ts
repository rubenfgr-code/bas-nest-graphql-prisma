import { Field, InputType, Int } from '@nestjs/graphql';
import { GENDER } from '../profile-gender.enum';

@InputType()
export class UpdateProfileInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  firstname: string;

  @Field(() => String, { nullable: true })
  lastname: string;

  @Field(() => GENDER, { nullable: true })
  gender: GENDER;

  @Field({ nullable: true })
  birthday: Date;
}
