//#region imports
//#region http
import express from "express";
import { Server } from "http";
import cors from "cors";
//#endregion

//#region Apollo (graphql)
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
//#endregion

//#region Multer (File Upload)
import multer from "multer";
//#endregion

//#region support
import dotenv from "dotenv";
import "reflect-metadata";
import Container from "typedi";
import { SpreadsheetService } from "../services/data/SpreadsheetRowService";
import { toNumber } from "lodash";
import { Readable } from "stream";
import { PodResolver } from "../resolvers/PodResolver";
import { PodService } from "../services/data/PodService";
import { ServerConfig } from "./ServerConfig";
import { ConversionTypeService } from "../services/data/ConversionTypeService";
import { CustomMethodService } from "../services/data/CustomMethodService";
import { DataMapper } from "../models/mappers/DataMapper";
import { ConversionTypeResolver } from "../resolvers/ConversionTypeResolver";
export class ApiServer {
  app: express.Express;
  port: number;
  secret: string;
  router: express.Router;
  server: Server;
  upload: multer.Multer;
  fileName: string;

  constructor() {
    dotenv.config();

    this.app = express();
    this.port = parseInt(process.env.PORT) || 4003;
    this.secret = process.env.SECRET;
    this.router = express.Router();

    //#region type-di container set up
    Container.set(PodService, new PodService({ baseUrl: ServerConfig.ords.url, entity: ServerConfig.ords.pod }));
    Container.set(
      ConversionTypeService,
      new ConversionTypeService({ baseUrl: ServerConfig.ords.url, entity: ServerConfig.ords.conversionTypes })
    );
    Container.set(CustomMethodService, new CustomMethodService({ baseUrl: ServerConfig.ords.url }));
    Container.set(DataMapper, new DataMapper());
    //#endregion
  }

  async configure() {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [PodResolver, ConversionTypeResolver],
        container: Container,
        validate: true,
        dateScalarMode: "isoDate",
      }),
      context: ({ req, res }) => ({ req, res }),
    });
    await server.start();
    server.applyMiddleware({ app: this.app });
    // express router config
    //this.router.use(
    //jwt({ algorithms: ["HS256"], secret: this.secret }).unless({
    //path: ["/token", "/auth", "/api/upload/"],
    //})
    //);

    //#endregion

    //#region express routes
    this.router.post(
      "/api/upload/:podId",
      multer({ storage: multer.memoryStorage() }).single("file"),
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const spService = Container.get(SpreadsheetService);
        const saveFileConfig = {
          fileContents: Readable.from(req.file.buffer),
          fileName: req.file.originalname,
          podId: toNumber(req.params["podId"]),
        };
        const oracleRest = await spService.saveFile(saveFileConfig);
        res.send({ response: oracleRest });
      }
    );

    //#endregion
    //#region middleware
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(this.router);

    //#endregion
  }

  async startUp() {
    // config express
    await this.configure();
    // start express
    this.server = this.app.listen(this.port, () => {
      console.log(`server started at http://${process.env.WEBSITE_HOSTNAME}:${this.port}/graphql`);
    });
    console.log("Server has started!");
  }
}
