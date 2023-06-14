import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";

import ConnectDB from "./models/database/MySQL"
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
        const fetch = new FetchController();
        const insert = new InsertController();
        const update = new UpdateController();
        this.app.get("/:table?/:id?", fetch.index);
        this.app.post("/:table", insert.index);
        this.app.put("/:table", update.index);
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
