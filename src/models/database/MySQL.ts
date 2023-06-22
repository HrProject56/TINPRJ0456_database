import mysql, {PoolConnection} from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

class ConnectDB {
    private pool: mysql.Pool;
    private connection: PoolConnection | undefined;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_DB,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
    }

    public async connect(): Promise<void> {
        try {
            this.connection = await this.pool.getConnection();
            console.log("Connected to MySQL!");
        } catch (error) {
            console.error("Error connecting to MySQL:", error);
        }
    }

    public async fetch(table: string, id: string): Promise<void> {
        // Perform database operations using the connection
        try {
            if (this.connection && table != undefined) {
                let query;
                query = `SELECT *
                         FROM ${table}`;
                if (id != undefined) query = query + ` WHERE id = ${id}`
                const [rows, fields] = await this.connection.query(query);
                return rows as any;
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (this.connection) {
                await this.connection.release();
            }
        }
    }

    public async insert(body: object, table: string): Promise<void> {
        try {
            if (this.connection) {
                let query = `SELECT *
                             FROM ${table}`
                let [rows, fields] = await this.connection.query(query);

                const values: string[] = [];
                const keys: string[] = [];

                for (let i = 0; i < fields.length; i++) {
                    let key = Object.keys(body)[i] as keyof typeof body;
                    let field = fields[i].name

                    if (key != undefined && key != "id" && Object.prototype.hasOwnProperty.call(body, key)) {
                        if (key == field) {
                            const value = typeof body[key] === 'string' ? `"${body[key]}"` : body[key];
                            values.push(value);
                            keys.push(key);
                        }
                    }
                }

                let concatenatedValues = values.join(', ');
                let concatenatedKeys = keys.join(', ');
                concatenatedValues = `(${concatenatedValues})`
                concatenatedKeys = `(${concatenatedKeys})`

                query = `INSERT INTO ${table} ${concatenatedKeys} VALUES ${concatenatedValues}`
                console.log('Concatenated Values:', concatenatedValues);
                console.log('Concatenated Keys:', concatenatedKeys);
                console.log(query);

                [rows, fields] = await this.connection.query(query);
                return rows as any;
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (this.connection) {
                this.connection.release();
            }
        }
    }

    async update(body: object, table: string) {
        try {
            if (this.connection) {
                let query = `SELECT *
                             FROM ${table}`
                let [rows, fields] = await this.connection.query(query);

                let id: string | undefined;
                let field: string | undefined;
                let key: string | undefined;
                let value: string | undefined;

                const fieldNames: string[] = [];
                const keys: string[] = [];
                const values: string[] = [];

                for (let i = 0; i < fields.length; i++) {
                    field = fields[i].name;
                    key = Object.keys(body)[i] as keyof typeof body;
                    value = body[key];

                    if (field != undefined) {
                        fieldNames.push(fields[i].name)
                    }

                    if (key != "id") {
                        if (key != undefined) {
                            keys.push(key);
                        }

                        if (value != undefined) {
                            if (typeof value === 'string'){
                                value = `"${value}"`
                            }
                            values.push(value);
                        }
                    }

                    if (key == "id"){
                        id = value;
                    }
                }

                const verified: string[] = [];
                for (let i = 0; i < keys.length; i++) {
                    if (fieldNames.includes(keys[i])) {
                        verified.push(`${keys[i]} = ${values[i]}`);
                    }
                }

                let concatVerified = verified.join(', ');
                query = `UPDATE ${table} SET ${concatVerified} WHERE id = ${id}`;
                [rows, fields] = await this.connection.query(query);
                return rows as any;
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (this.connection) {
                this.connection.release();
            }
        }
    }
}

export default ConnectDB;