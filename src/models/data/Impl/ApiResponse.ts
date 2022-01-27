import { IApiResponse } from "../Interfaces/IApiResponse";
import { IOracleItem } from "../Interfaces/IOracleItem";
import { IOracleLink } from "../Interfaces/IOracleLink";
import { IOracleResponse } from "../Interfaces/IOracleResponse";

export class ApiResponse<T> implements IApiResponse<T> {
  collection?: IOracleResponse<T>;
  item?: T;
  error?: { code: string; title: string; message: string; type: string; instance: string };
  constructor() {
    this.collection = {
      items: new Array<T>(),
      hasMore: false,
      limit: 0,
      offset: 0,
      count: 0,
      links: new Array<IOracleLink>(),
    };
    this.item = {} as T;
    this.error = { code: "", title: "", message: "", type: "", instance: "" };
  }
}
