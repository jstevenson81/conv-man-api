import _ from "lodash";
import { Service } from "typedi";
import { CsvService } from "../general/CsvService";
import { writeToString } from "@fast-csv/format";
import { OracleRestServiceBase } from "./base/OracleRestServiceBase";
import { CnvSpreadsheet } from "../../models/data/Impl/CnvSpreadsheet";

@Service()
export class SpreadsheetService extends OracleRestServiceBase {
  constructor(private csvService: CsvService, httpConfig: { baseUrl: string; entity: string }) {
    super(httpConfig);
  }

  async saveFile(config: { fileContents: NodeJS.ReadableStream; fileName: string; podId: number }): Promise<any> {
    const csvFile = await this.csvService.parseFile(config);

    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));

    let spRows: Array<CnvSpreadsheet> = [];
    csvFile.rows.map((row, idx) => {
      let spRow: CnvSpreadsheet = new CnvSpreadsheet();
      let i = 0;
      let timesThroughAlphabet = 0;
      row.map((col, colIdx) => {
        let colName = "COLUMN_";

        if (timesThroughAlphabet === 0) colName += alphabet[i];
        else if (timesThroughAlphabet === 1) colName += alphabet[timesThroughAlphabet] + alphabet[i];
        spRow[colName] = col;

        i++;
        if (i === alphabet.length) timesThroughAlphabet++;
      });
      spRows.push(spRow);
    });

    const csv = await writeToString(spRows, { headers: true });
    return await this.runPost<any>({ action: "batchload", body: csv, contentType: "text/csv" });
  }
}
