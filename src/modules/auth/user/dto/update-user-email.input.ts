import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateUserEmailInput {
  @Field(() => Int)
  id: number;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsEmail()
  @Field(() => String)
  emailRepeat: string;
}
