import { config } from "dotenv";
config();
import environments from "./shared/environments";
import app from "./shared/app";
import ReportRouter from "./modules/report/infrastructure/api/routes/report.router";
async function init() {
  const version:string = environments.APP_VERSION;
  //correr routers
  await new app([
    new ReportRouter(version),
  ], environments.APP_PORT).listen();
}
init();
