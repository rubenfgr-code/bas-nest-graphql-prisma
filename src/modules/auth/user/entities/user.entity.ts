import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from '../../profile/entities/profile.entity';
import { Role } from '../../role/object-types/role.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => Role)
  role: Role;

  @Field(() => Profile)
  profile: Profile;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
