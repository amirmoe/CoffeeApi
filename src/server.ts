import http from "http";
import express from "express";
import middleware from "./middleware";
import routes from "./services/routes"
import { createConnection } from "typeorm";
import { applyMiddleware, applyRoutes } from "./utils";
import * as dotenv from "dotenv";

dotenv.config();

createConnection().then(async connection => {

    const router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);

    const { PORT = 3000 } = process.env;
    const server = http.createServer(router);

    server.listen(PORT, () =>
        console.log(`Server is running http://localhost:${PORT}...`)
    );

}).catch(error => console.log("TypeORM connection error: ", error));
