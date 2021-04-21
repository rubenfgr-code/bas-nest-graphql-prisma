import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Boolean, { nullable: true })
  isActive: boolean;
}
