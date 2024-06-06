import * as bodyParser from "body-parser";
import compression from "compression";
import cors from 'cors';
import express from "express";
import trimRequest from "ts-trim-request";
const { queryParser } = require('express-query-parser')
import { RequestHandler } from "express-serve-static-core";
import { ParsedQs } from "qs";
const os = require("os");
const formData = require("express-form-data");
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};


class App {
  public app: express.Application;
  public port: number;

  constructor(routers: any[], port: number,) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRouters(routers);
  }
  
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(formData.parse(options));

    this.app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    this.app.use(trimRequest.all);
    this.app.use(
      queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true,
        parseString: true,
      })
    )
  }
  private initializeRouters(routers: any[]) {
    routers.forEach((router: { router: RequestHandler<{}, any, any, ParsedQs, Record<string, any>>; }) => {
      this.app.use("", router.router);
    });
  }
  public async listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
