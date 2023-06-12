import {Request, Response} from "express";
import ConnectDB from "../models/database/MySQL";
import Reading from "../models/data/Reading";
import Sensor from "../models/data/Sensor";
import Material from "../models/data/Material";

class InsertController {
    private result: Material | Sensor | Reading | undefined;
    private msg: void | undefined;

    constructor() {
        this.index = this.index.bind(this)
    }

    public async index(req: Request, res: Response): Promise<void> {
        const {table} = req.params;
        const {body} = req.body;
        const actions = ["material", "reading", "sensor"];

        if (!actions.includes(table)) {
            res.json({"msg": "action doesnt exist"})
            return;
        }

        console.log(body);

        if (table === "material") {
            this.result = new Material(body);
        }
        if (table === "sensor") {
            this.result = new Sensor(body);
        }
        if (table === "reading") {
            this.result = new Reading(body);
        }

        const db = new ConnectDB();
        await db.connect();

        if (this.result !== undefined) {
            this.msg = await db.insert(this.result.body, table);
        } else {
            console.log("Insert underfined")
        }

        res.json(this.msg)
    }
}

export default InsertController;