import {Request, Response} from "express";
import ConnectDB from "../models/database/MySQL"

class FetchController {
    public async index(req: Request, res: Response): Promise<void> {
        let msg;
        let fetchedData;

        const db = new ConnectDB();
        await db.connect();

        const {table} = req.params;
        fetchedData = await db.fetch(table);

        if (fetchedData === undefined) {
            msg = { msg: "unknown error" };
        } else if (Object.keys(fetchedData).length === 0) {
            msg = { msg: "table is empty" };
        } else {
            msg = fetchedData;
        }

        res.json(msg);
    }
}

export default FetchController;
