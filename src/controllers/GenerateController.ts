import {Request, Response} from "express";
import * as http from "http";
import dotenv from "dotenv";
import * as fs from 'fs';

dotenv.config(); // Load environment variables from .env file

class GenerateController {
    public async index(req: Request, res: Response): Promise<void> {
        const options = {
            hostname: '127.0.0.1', // Replace with the actual API hostname
            port: `${process.env.EXPRESS_PORT}`,
            path: '/api/v1/reading', // Replace with the actual API endpoint
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const request = http.request(options, (response) => {
            let requestData = '';
            response.on('data', (chunk) => {
                requestData += chunk;
            });

            response.on('end', () => {
                // Generate CSV file
                let csvContent = "";
                requestData = JSON.parse(requestData)
                for (let i = 0; i < requestData.length; i++) {
                    const obj = requestData[i];
                    csvContent += Object.entries(obj)
                        .map(([key, value]) => `${key};${value}`)
                        .join('\n');

                    if (i < requestData.length - 1) {
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

                res.json(csvContent);
            });
        });

        request.on('error', (error) => {
            console.error(error);
            res.status(500).send('An error occurred'); // Send an error response to the client
        });

        request.end();
    }
}

export default GenerateController;
