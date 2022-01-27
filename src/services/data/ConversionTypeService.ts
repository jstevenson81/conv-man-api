import { Service } from "typedi";
import { ApiResponse } from "../../models/data/Impl/ApiResponse";
import { IUxConversionType } from "../../models/data/Interfaces/IUxConversionType";
import { OracleRestServiceBase } from "./base/OracleRestServiceBase";

@Service()
export class ConversionTypeService extends OracleRestServiceBase {
  async getAllConvTypes(): Promise<ApiResponse<IUxConversionType>> {
    let response = new ApiResponse<IUxConversionType>();
    try {
      const axiosResponse = await this.runGetMany<IUxConversionType>();
      response.collection = axiosResponse.data;
    } catch (e) {
      response.error = this.handleError(e, "GET", "ORDS_API_EXCEPTION");
    }
    return response;
  }
  async getOneConvType(id: number): Promise<ApiResponse<IUxConversionType>> {
    let response = new ApiResponse<IUxConversionType>();
    try {
      const axiosResponse = await this.runGetOne<IUxConversionType>(id.toString());
      response.item = axiosResponse.data;
    } catch (e) {
      response.error = this.handleError(e, "GET", "ORDS_API_EXCEPTION");
    }
    return response;
  }
}


