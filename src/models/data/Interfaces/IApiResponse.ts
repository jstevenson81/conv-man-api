import { IOracleResponse } from "./IOracleResponse";
import { IOracleItem } from "./IOracleItem";

export interface IApiResponse<T extends IOracleItem> {
  item?: T;
  collection?: IOracleResponse<T>;
  error?: {
    code: string;
    title: string;
    message: string;
    type: string;
    instance: string;
  };
}
