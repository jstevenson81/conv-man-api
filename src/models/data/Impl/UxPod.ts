import { IOracleLink } from "../Interfaces/IOracleLink";
import { IUxPod } from "../Interfaces/IUxPod";

export class UxPod implements IUxPod {
  uxp_ux_pod_email_id: number;
  ux_pod_id: number;
  pod_name: string;
  pod_url: string;
  links?: IOracleLink[];

}


