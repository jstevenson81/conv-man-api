import { parseStream, parseString } from "@fast-csv/parse";
import { DateTime } from "luxon";
import _ from "lodash";
import { CsvParseResponse } from "../../models/CsvParseResponse";
import { Service } from "typedi";
import { ReadableStream } from "node:stream/web";

@Service()
export class CsvService {
  constructor() {}

  async parseFile(config: {
    fileContents: NodeJS.ReadableStream;
    fileName: string;
    podId: number;
  }): Promise<CsvParseResponse> {
    let parse = new Promise<CsvParseResponse>((resolve) => {
      let data: CsvParseResponse = {
        rows: [],
        rowCount: 0,
      };
      parseStream(config.fileContents, { skipRows: 1, objectMode: true })
        .on("data", (row) => data.rows.push(row))
        .on("error", (er) => {
          throw er;
        })
        .on("end", (rowCount: number) => {
          data.rowCount = rowCount;
          resolve(data);
        });
      // parseString(config.fileContents, { headers: true })
      //   .on("error", (error) => {})
      //   .on("data", (row) => {
      //     data.rows.push(row);
      //   })
      //   .on("end", async (rowCount: number) => {
      //     data.rowCount = rowCount;
      //     data.rows = data.rows.map((row) => ({
      //       ...row,
      //       fileName: config.fileName,
      //       podId: config.podId,
      //       timeAdded: DateTime.now().toJSON(),
      //       timeExecuted: null,
      //     }));
      //     resolve(data);
      //   });
    });

    return parse;
  }
}
