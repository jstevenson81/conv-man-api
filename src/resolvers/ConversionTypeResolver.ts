import { ApolloError } from "apollo-server-express";
import { toNumber } from "lodash";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { UxConversionType } from "../models/data/Impl/UxConversionType";
import { IApiResponse } from "../models/data/Interfaces/IApiResponse";
import { ConversionTypeInput } from "../models/GraphQl/InputTypes/ConversionTypeInput";
import { ConversionType } from "../models/GraphQl/OutputTypes/ConversionType";
import { DataMapper } from "../models/mappers/DataMapper";
import { ConversionTypeService } from "../services/data/ConversionTypeService";
import { ConvManResolver } from "./base/ConvManResolver";

@Service()
@Resolver(ConversionType)
export class ConversionTypeResolver extends ConvManResolver {
  constructor(private convTypeSvc: ConversionTypeService, private mapper: DataMapper) {
    super();
  }

  @Query(() => [ConversionType], { description: "Gets all conversion types" })
  async getAllConversionTypes(): Promise<Array<ConversionType>> {
    const response = await this.convTypeSvc.getAllConvTypes();
    this.validateApiResponse(response);
    const convTypes: ConversionType[] = [];

    response.collection.items.forEach((c: UxConversionType) => {
      convTypes.push(this.mapper.mapUxConvTypeToConvType(c));
    });
    return convTypes;
  }

  @Query(() => ConversionType, { description: "Gets one conversion type based on the id" })
  async getOneConversionType(@Arg("id") id: number): Promise<ConversionType> {
    const response = await this.convTypeSvc.getOneConvType(id);
    this.validateApiResponse(response);
    return this.mapper.mapUxConvTypeToConvType(response.item);
  }

  @Mutation(() => ConversionType, { description: "add a new conversion type" })
  async upsertConversionType(
    @Arg("data", { description: "The body of the request" }) data: ConversionTypeInput
  ): Promise<ConversionType> {
    let response: IApiResponse<UxConversionType>;
    if (toNumber(data.convTypeId) === 0) {
      data.convTypeId = null;
      response = await this.convTypeSvc.add(this.mapper.mapConvTypeToUxConvType(data));
    }
    // update flow
    else throw new ApolloError("Update is not yet implemented");
    this.validateApiResponse(response, this.mapper.mapConvTypeToUxConvType(data));
    return this.mapper.mapUxConvTypeToConvType(response.item);
  }
}
