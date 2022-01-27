import { MaxLength } from "class-validator";
import { Field, ID, InputType } from "type-graphql";

@InputType("ConversionTypeInput", { description: "Defines a conversion type used for insert/updates" })
export class ConversionTypeInput {
  @Field(() => ID)
  convTypeId: number;
  @Field({ nullable: false })
  @MaxLength(128)
  convTypeName: string;
}
