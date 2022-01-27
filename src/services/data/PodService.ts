import { Service } from "typedi";
import { ApiResponse } from "../../models/data/Impl/ApiResponse";
import { UxPod } from "../../models/data/Impl/UxPod";
import { IApiResponse } from "../../models/data/Interfaces/IApiResponse";
import { IUxPod } from "../../models/data/Interfaces/IUxPod";
import { OracleRestServiceBase } from "./base/OracleRestServiceBase";

@Service()
export class PodService extends OracleRestServiceBase {
  async getAllPods(): Promise<ApiResponse<IUxPod>> {
    let response = new ApiResponse<UxPod>();
    try {
      const axiosResponse = await this.runGetMany<IUxPod>();
      response.collection = axiosResponse.data;
    } catch (e) {
      response.error = this.handleError(e, "GET", "API_GET_EXCEPTION");
    }
    return response;
  }
  async getOnePod(id: number): Promise<ApiResponse<IUxPod>> {
    let response = new ApiResponse<IUxPod>();
    try {
      const axiosResponse = await this.runGetOne<IUxPod>(id.toString());
      response.item = axiosResponse.data;
    } catch (e) {
      response.error = this.handleError(e, "GET", "API_GET_EXCEPTION");
    }
    return response;
  }
}
