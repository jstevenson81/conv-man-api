export type ErrorCodes = "POST" | "GET";
export type ErrorTypes = "API_POST_EXCEPTION" | "API_GET_EXCEPTION" | "ORDS_API_EXCEPTION";
export interface IOracleApiError {
  code: ErrorCodes;
  title: string;
  message: string;
  type: ErrorTypes;
  instance: string;
}
