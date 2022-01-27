import { IOracleItem } from "./IOracleItem";

export interface IUxPod extends IOracleItem {
  ux_pod_id: number;
  pod_name: string;
  pod_url: string;
  uxp_ux_pod_email_id: number;
}
