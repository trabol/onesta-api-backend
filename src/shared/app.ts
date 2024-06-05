import * as bodyParser from "body-parser";
import compression from "compression";
import cors from 'cors';
import express from "express";
import trimRequest from "ts-trim-request";
const { queryParser } = require('express-query-parser')
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';
import { v1 as uuidv1 } from "uuid";

import environments from "./environments"
const os = require("os");
const formData = require("express-form-data");
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};


class App {
  public app: express.Application;
  public port: number;
  public country: string;

  constructor(routers, port, country?) {
    this.app = express();
    this.port = port;
    this.country = country;
    this.initializeMiddlewares();
    this.initializeRouters(routers);
    this.initializeSwagger();
  }
  private initializeSwagger() {
    if(environments.APP_ENVIRONMENT=="DEV"){
      const swaggerDocument = swaggerJsdoc(environments.SWAGGER_SPEC);
      this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  }
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(formData.parse(options));

    this.app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use((err, req, res, next) => {
      if (err) {
        const apiError = {
          code: 400,
          message: "Bad request",
        }
        return res.status(apiError.code).json(apiError);
      }
      next();
    });

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
  private initializeRouters(routers) {
    routers.forEach((router) => {
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
