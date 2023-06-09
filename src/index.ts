import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";

import ConnectDB from "./models/database/MySQL"
import FetchController from "./controllers/FetchController";

dotenv.config(); // Load environment variables from .env file

class App {
    private app: express.Application;
    private readonly port: number;
    private readonly mode: string;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.EXPRESS_PORT || "3000");
        this.mode = process.env.NODE_ENV || 'development';
        this.setupMiddlewares();
        this.setupViews();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private setupViews(): void {
        this.app.set("view engine", "ejs");
        this.app.set("views", "src/views");
    }
    private setupRoutes(): void {
        const homeController = new FetchController();
        this.app.get("/", homeController.index);
    }

    public start(): void {
        this.app.listen(this.port, async () => {
            console.log(`Server is running on http://localhost:${this.port}`);
            console.log(`Running in ${this.mode} mode.`)
        });
    }
}

const app = new App();
app.start();
