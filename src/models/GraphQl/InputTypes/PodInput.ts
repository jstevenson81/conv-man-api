import { MaxLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType("PodInput", { description: "Used to add or update a pod record in the autonomous database" })
export class PodInput {
  @Field(() => ID)
  podId: number;
  @Field({ nullable: false })
  @MaxLength(256)
  podName: string;
  @Field({ nullable: false })
  @MaxLength(512)
  podUrl: string;
  @Field()
  podEmailDomainId: number;
}
