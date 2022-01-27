import { ApolloError } from "apollo-server-express";
import { IApiResponse } from "../../models/data/Interfaces/IApiResponse";

export abstract class ConvManResolver {
  validateApiResponse<T>(response: IApiResponse<T>, passedData?: T): void {
    // This means a unique constraint was violated, so we have to tell the caller
    // that a unique value must be passed and return the data back to them
    if (response.error.message.toUpperCase().indexOf("ORA-00001"))
      throw new ApolloError(
        "The data passed must be unique.  Please validate your data does not match other items.",
        response.error.code,
        passedData
      );
    if (response.error && response.error.code !== "") {
      throw new ApolloError(response.error.message, response.error.code, response.error);
    }
  }
}
