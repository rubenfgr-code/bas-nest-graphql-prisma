import { Field, InputType, Int } from '@nestjs/graphql';
import { IsJSON, IsOptional } from 'class-validator';

@InputType()
export class FindAllUsersInput {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => String, {
    nullable: true,
    description: 'Require Prisma.UserWhereUniqueInput',
  })
  @IsJSON()
  @IsOptional()
  cursor?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Require Prisma.UserWhereInput',
  })
  @IsJSON()
  @IsOptional()
  where?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Require Prisma.UserOrderByInput',
  })
  @IsJSON()
  @IsOptional()
  orderBy?: string;
}
