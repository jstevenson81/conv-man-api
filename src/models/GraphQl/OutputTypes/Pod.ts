import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Pod {
  @Field(() => ID)
  podId: number;
  @Field({ nullable: false })
  @MaxLength(256)
  podName: string;
  @Field({ nullable: false })
  @MaxLength(512)
  podUrl: string;
  @Field({ nullable: true })
  podEmailDomain?: string;
  @Field()
  podEmailDomainId: number;
}
