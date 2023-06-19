import {Request, Response} from "express";
import * as fs from 'fs';

class GenerateController {
    public async index(req: Request, res: Response): Promise<void> {
        // Example JSON data
        const jsonData = [
            {
                "id": 7,
                "materialId": 1,
                "size": 10,
                "readingDate": "2023-06-11T22:00:00.000Z",
                "exposure": 10,
                "concentration": 100,
                "rBefore": 255,
                "gBefore": 255,
                "bBefore": 255,
                "rAfter": 1,
                "gAfter": 2,
                "bAfter": 3,
                "dE": 10,
                "sensorId": 1,
                "created_at": "2023-06-12T21:59:59.000Z",
                "updated_at": "2023-06-12T11:59:59.000Z"
            },
            {
                "id": 8,
                "materialId": 1,
                "size": 10,
                "readingDate": "2023-06-11T22:00:00.000Z",
                "exposure": 10,
                "concentration": 100,
                "rBefore": 255,
                "gBefore": 255,
                "bBefore": 255,
                "rAfter": 250,
                "gAfter": 250,
                "bAfter": 250,
                "dE": 10,
                "sensorId": 1,
                "created_at": "2023-06-12T21:59:59.000Z",
                "updated_at": "2023-06-12T21:59:59.000Z"
            },
            {
                "id": 9,
                "materialId": 1,
                "size": 10,
                "readingDate": "2023-06-11T22:00:00.000Z",
                "exposure": 10,
                "concentration": 100,
                "rBefore": 255,
                "gBefore": 255,
                "bBefore": 255,
                "rAfter": 250,
                "gAfter": 250,
                "bAfter": 250,
                "dE": 10,
                "sensorId": 1,
                "created_at": "2023-06-12T21:59:59.000Z",
                "updated_at": "2023-06-12T21:59:59.000Z"
            },
            {
                "id": 10,
                "materialId": 1,
                "size": 10,
                "readingDate": "2023-06-11T22:00:00.000Z",
                "exposure": 10,
                "concentration": 100,
                "rBefore": 255,
                "gBefore": 255,
                "bBefore": 255,
                "rAfter": 250,
                "gAfter": 250,
                "bAfter": 250,
                "dE": 10,
                "sensorId": 1,
                "created_at": "2023-06-12T21:59:59.000Z",
                "updated_at": "2023-06-12T21:59:59.000Z"
            },
            {
                "id": 11,
                "materialId": 1,
                "size": 10,
                "readingDate": "2023-06-11T22:00:00.000Z",
                "exposure": 10,
                "concentration": 100,
                "rBefore": 255,
                "gBefore": 255,
                "bBefore": 255,
                "rAfter": 250,
                "gAfter": 250,
                "bAfter": 250,
                "dE": 10,
                "sensorId": 1,
                "created_at": "2023-06-12T21:59:59.000Z",
                "updated_at": "2023-06-12T21:59:59.000Z"
            },
            {
                "id": 12,
                "materialId": 1,
                "size": 10,
                "readingDate": "2023-06-11T22:00:00.000Z",
                "exposure": 10,
                "concentration": 100,
                "rBefore": 255,
                "gBefore": 255,
                "bBefore": 255,
                "rAfter": 250,
                "gAfter": 250,
                "bAfter": 250,
                "dE": 10,
                "sensorId": 1,
                "created_at": "2023-06-12T21:59:59.000Z",
                "updated_at": "2023-06-12T21:59:59.000Z"
            }
        ];

        // Generate CSV file
        let csvContent = '';
        for (let i = 0; i < jsonData.length; i++) {
            const obj = jsonData[i];
            csvContent += Object.entries(obj)
                .map(([key, value]) => `${key};${value}`)
                .join('\n');

            if (i < jsonData.length - 1) {
                csvContent += '\n\n'; // Add a newline after each object
            }
        }

        const csvFileName = 'data.csv';
        fs.writeFile(csvFileName, csvContent, (err: NodeJS.ErrnoException | null) => {
            if (err) {
                console.error('Error writing CSV file:', err);
                return;
            }
            console.log(`CSV file "${csvFileName}" generated.`);
        });
    }
}

export default GenerateController;
