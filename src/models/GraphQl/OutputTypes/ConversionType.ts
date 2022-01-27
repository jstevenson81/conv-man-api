import { MaxLength } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";


@ObjectType("ConversionType", {description: "Defines a conversion type for use by callers"})
export class ConversionType {
  @Field(() => ID)
  convTypeId: number;
  @Field({ nullable: false })
  @MaxLength(128)
  convTypeName: string;
}


