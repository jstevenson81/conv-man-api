import { IOracleLink } from "../Interfaces/IOracleLink";
import { IUxPodEmail } from "../Interfaces/IUxPodEmail";


export class UxPodEmail implements IUxPodEmail {
  ux_pod_email_id: number;
  email_domain: string;
  links: IOracleLink[];

}
