import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindOneUserInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
