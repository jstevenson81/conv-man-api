import { IOracleLink } from "../Interfaces/IOracleLink";
import { IUxConversionType } from "../Interfaces/IUxConversionType";

export class UxConversionType implements IUxConversionType {
  ux_conversion_type_id: number;
  conversion_type_name: string;
  links?: IOracleLink[];

  constructor() {
    this.conversion_type_name = "";
    this.ux_conversion_type_id = 0;
    this.links = new Array<IOracleLink>();
  }
}
