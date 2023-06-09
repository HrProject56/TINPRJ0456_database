import { Request, Response } from 'express';
import ConnectDB from "../models/database/MySQL"
import Material from '../models/data/Material';
import Sensor from "../models/data/Sensor";
import Reading from "../models/data/Reading";

class FetchController {
    public async index(req: Request, res: Response): Promise<void> {
        const db = new ConnectDB();
        await db.connect();
        const data = await db.fetch("material");


        // const material = new Material(
        //     0,
        //     "Almoniak",
        //     +new Date,
        //     +new Date
        // );
        //
        // const sensor = new Sensor(
        //     0,
        //     "Sensor1",
        //     +new Date,
        //     +new Date,
        // );
        //
        // const data = {
        //     "reading_id": 0,
        //     "size": 10,
        //     "reading_date": 1686303461922,
        //     "exposure": 10,
        //     "concentration": 100,
        //     "rBefore": 255,
        //     "gBefore": 255,
        //     "bBefore": 255,
        //     "rAfter": 250,
        //     "gAfter": 250,
        //     "bAfter": 250,
        //     "dE": 10,
        //     "material_id": 0,
        //     "sensor_id": 0,
        //     "created_at": +new Date,
        //     "updated_at": +new Date
        // }
        // const reading = new Reading(data);

        // res.json(material);
        // res.json(sensor);
        res.json(data);
    }
}

export default FetchController;
