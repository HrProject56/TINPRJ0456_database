"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const FetchController_1 = __importDefault(require("./controllers/FetchController"));
dotenv.config(); // Load environment variables from .env file
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.EXPRESS_PORT || "3000");
        this.mode = process.env.NODE_ENV || 'development';
        this.setupMiddlewares();
        this.setupViews();
        this.setupRoutes();
    }
    setupMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setupViews() {
        this.app.set("view engine", "ejs");
        this.app.set("views", "src/views");
    }
    setupRoutes() {
        const homeController = new FetchController_1.default();
        this.app.get("/:table?", homeController.index);
    }
    start() {
        this.app.listen(this.port, async () => {
            console.log(`Server is running on http://localhost:${this.port}`);
            console.log(`Running in ${this.mode} mode.`);
        });
    }
}
const app = new App();
app.start();
