import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Validate, ValidateNested } from 'class-validator';
import { UpdateProfileInput } from '../../profile/dto/update-profile.input';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  roleId?: number;

  @IsOptional()
  @Field(() => String, { nullable: true })
  username?: string;

  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field(() => UpdateProfileInput, { nullable: true })
  @Validate(() => UpdateProfileInput)
  profile?: UpdateProfileInput;
}
