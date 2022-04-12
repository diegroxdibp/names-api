import cors from "cors";
import express from "express";
import { join } from "path";

import { ConsoleColor } from "./core/console";
import RequestLoggerMiddleware from "./core/http/request-logger.middleware";
import Logger from "./core/logger";
import router from "./routes";
import TokenMiddleware from "./security/token.middleware";

export default class App {
  public static run(port: number): void {
    const app = new App().express;
    app.listen(port, () =>
      Logger.log(`--> App started at port ${port}`, ConsoleColor.FgGreen)
    );
  }

  public express: express.Application;

  constructor() {
    this.express = express();
    this.setupExpress();
    // this.setupLogger();
    this.routes();
  }

  private setupExpress(): void {
    this.express.use(cors());
    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      next();
    });
    this.express.use(express.json({ limit: process.env.PAYLOAD_LIMIT }));
    this.express.use("/images", express.static("./images/"));
    this.express.use(
      express.urlencoded({
        extended: true,
        limit: process.env.PAYLOAD_LIMIT,
      })
    );
    // Function to serve all static files
    // inside public directory.
  }

  private routes(): void {
    // this.express.use(express.static(join(__dirname, "..", "public")));
    // this.express.use(TokenMiddleware.tokenVerify);
    this.express.use(router);
  }
}
