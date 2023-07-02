import {Request, Response} from "express";
import * as http from "http";
import dotenv from "dotenv";
import * as fs from 'fs';
import * as path from "path";

dotenv.config(); // Load environment variables from .env file

class GenerateController {
    public async index(req: Request, res: Response): Promise<void> {
        const rootPath = path.resolve(__dirname, '../../');
        const filePath = path.join(rootPath + '/data.csv'); // Specify the path of the file to be downloaded

        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                return res.status(404).send('File not found')
            }

            // Set the appropriate headers for the response
            res.setHeader('Content-Disposition', 'attachment; filename=data.csv'); // Specify the filename for the downloaded file
            res.setHeader('Content-Type', 'application/octet-stream'); // Set the appropriate content type

            // Stream the file to the response
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        })
    }
}

export default GenerateController;
