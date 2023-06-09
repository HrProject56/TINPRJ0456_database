import {Request, Response} from "express";
import ConnectDB from "../models/database/MySQL";
import Reading from "../models/data/Reading";
import Sensor from "../models/data/Sensor";
import Material from "../models/data/Material";

class InsertController {
    public async index(req: Request, res: Response): Promise<void> {
        const {table} = req.params;

        const db = new ConnectDB();
        await db.connect();

        const material = new Material(
            0,
            "Almoniak",
            +new Date,
            +new Date
        );

        const sensor = new Sensor(
            0,
            "Sensor1",
            +new Date,
            +new Date,
        );

        const data = {
            "id": 0,
            "materialId": 0,
            "size": 10,
            "readingDate": 1686303461922,
            "exposure": 10,
            "concentration": 100,
            "rBefore": 255,
            "gBefore": 255,
            "bBefore": 255,
            "rAfter": 250,
            "gAfter": 250,
            "bAfter": 250,
            "dE": 10,
            "sensorId": 0,
            "created_at": +new Date,
            "updated_at": +new Date
        }
        const reading = new Reading(data);

        const body = material;
        // const body = sensor;
        // const body = reading["body"];

        await db.insert(body, table);

        res.json(body)
    }
}

export default InsertController;