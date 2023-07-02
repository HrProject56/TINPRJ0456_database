import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";

import ConnectDB from "./models/database/MySQL"
import GenerateController from "./controllers/GenerateController";
import DownloadController from "./controllers/DownloadController";
import FetchController from "./controllers/FetchController";
import InsertController from "./controllers/InsertController";
import UpdateController from "./controllers/UpdateController";

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
        this.app.use(bodyParser.json());
    }

    private setupViews(): void {
        this.app.set("view engine", "ejs");
        this.app.set("views", "src/views");
    }
    private setupRoutes(): void {
        const generate = new GenerateController();
        const download = new DownloadController();
        const fetch = new FetchController();
        const insert = new InsertController();
        const update = new UpdateController();
        this.app.get("/api/v1/generate", generate.index);
        this.app.get("/api/v1/download", download.index);
        this.app.get("/api/v1/:table?/:id?", fetch.index);
        this.app.post("/api/v1/:table", insert.index);
        this.app.put("/api/v1/:table", update.index);
    }

    public start(): void {
        this.app.listen(this.port, async () => {
            console.log(`Server is running on http://127.0.0.1:${this.port}`);
            console.log(`Running in ${this.mode} mode.`)
        });
    }
}

const app = new App();
app.start();
