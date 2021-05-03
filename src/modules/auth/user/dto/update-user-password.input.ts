import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordRepeat: string;
}
