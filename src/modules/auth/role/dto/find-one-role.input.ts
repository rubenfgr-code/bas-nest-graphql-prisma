import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindOneRoleInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
