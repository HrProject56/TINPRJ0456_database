import mysql, {PoolConnection} from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

class ConnectDB {
    private pool: mysql.Pool;
    private connection?: PoolConnection;

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

    public async fetch(table: string): Promise<void> {
        // Perform database operations using the connection
        try {
            if (this.connection) {
                const [rows, fields] = await this.connection.query(`SELECT * FROM ${table}`);
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