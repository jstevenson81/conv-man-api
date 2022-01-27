import axios, { AxiosError, AxiosResponse } from "axios";
import _ from "lodash";
import { IOracleItem } from "../../../models/data/Interfaces/IOracleItem";
import { IApiResponse } from "../../../models/data/Interfaces/IApiResponse";
import { IOracleResponse } from "../../../models/data/Interfaces/IOracleResponse";
import { ErrorCodes, ErrorTypes, IOracleApiError } from "../../../models/errors/IOracleApiError";
import { HttpHeaderContentType } from "./HttpHeaderContentType";

export class OracleRestServiceBase {
  constructor(private baseConfig: { baseUrl: string; entity?: string }) {
    axios.defaults.baseURL = baseConfig.baseUrl;
  }

  //#region error handling
  /**
   *
   * @param e the error
   * @param code the error code used to tell the UI about the exception
   * @param reqType the type of request that was performed
   * @returns {IOracleApiError} the error the occurred
   */

  protected handleError(e: any, code: ErrorCodes, reqType: ErrorTypes): IOracleApiError {
    return e.isAxiosError
      ? (e as AxiosError).response.data
      : { code: code, title: "Oracle ORDS Exception", type: reqType, message: e, instance: this.baseConfig.baseUrl };
  }

  //#endregion

  //#region generic http methods

  /**
   *
   * @param config this is an object that is made up of the following structure body: this is the body of the request, contentType: this is the content-type we are sending.  In the case of a csv, we would use text/csv
   *
   * @returns {IApiResponse} where the error is filled or the data is
   */
  protected async runPost<TInputType extends IOracleItem>(config: {
    body: TInputType;
    contentType: HttpHeaderContentType;
    action?: string;
  }): Promise<IApiResponse<TInputType>> {
    let response: IApiResponse<TInputType> = {};
    try {
      const actionUrl = config.action ? this.baseConfig.entity + config.action : this.baseConfig.entity;
      const axiosResponse = await axios.post<TInputType>(actionUrl, config.body, {
        headers: { "Content-Type": config.contentType },
      });
      response.item = axiosResponse.data;
    } catch (e) {
      response.error = this.handleError(e, "POST", "API_POST_EXCEPTION");
    }
    return response;
  }

  /**
   * This method runs a put.  A put in the ORDS world updates an existing item
   * @param config this is an object that is made up of the following structure body: this is the body of the request, contentType: this is the content-type we are sending.  In the case of a csv, we would use text/csv
   *
   * @returns {IApiResponse} where the error is filled or the data is
   */
  protected async runPut<TInputType extends IOracleItem>(config: {
    body: TInputType;
    contentType: HttpHeaderContentType;
  }): Promise<IApiResponse<TInputType>> {
    let response: IApiResponse<TInputType> = {};
    try {
      const axiosResponse = await axios.put<TInputType>(this.baseConfig.entity, config.body, {
        headers: { "Content-Type": config.contentType },
      });
      response.item = axiosResponse.data;
    } catch (e) {
      response.error = this.handleError(e, "POST", "API_POST_EXCEPTION");
    }
    return response;
  }

  /**
   * This method runs a GET
   * @param path if this is passed, we override the base entity path
   * @returns the type passed in the call (generic)
   */

  protected async runGetMany<T>(): Promise<AxiosResponse<IOracleResponse<T>>> {
    return await axios.get<IOracleResponse<T>>(this.baseConfig.entity, {
      headers: { "Content-Type": "application/json" },
    });
  }

  protected async runGetOne<T>(path: string): Promise<AxiosResponse<T>> {
    return await axios.get<T>(this.baseConfig.entity + path, {
      headers: { "Content-Type": "application/json" },
    });
  }
  //#endregion
  //#region standard http methods

  async add<TInputType extends IOracleItem>(body: TInputType): Promise<IApiResponse<TInputType>> {
    return await this.runPost({ body: body, contentType: "application/json" });
  }

  async update<TInputType extends IOracleItem>(body: TInputType): Promise<IApiResponse<TInputType>> {
    return await this.runPut({ body: body, contentType: "application/json" });
  }

  //#endregion
}
