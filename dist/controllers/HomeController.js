"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class HomeController {
    index(req, res) {
        const user = new User_1.default("name", "email");
        res.json(user);
    }
}
exports.default = HomeController;
