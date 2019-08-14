import { Pool } from 'pg';
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const pool = {
	connectionString: config.db,
};
// eslint-disable-next-line no-console
console.log(config.db);


class DatabaseInstance {
	constructor() {
		this.pool = new Pool(pool);
		this.connect = async () => this.pool.on('connect', () => {
		});

		this.queryUsers = `CREATE TABLE IF NOT EXISTS users(
          id serial PRIMARY KEY,
          email VARCHAR(40) UNIQUE NOT NULL,
          first_name VARCHAR(25) NOT NULL,
          last_name VARCHAR(25) NOT NULL,
          password  VARCHAR(200) NOT NULL
        )`;

		this.queryTrips = `CREATE TABLE IF NOT EXISTS trips(
					id serial PRIMARY KEY,
					seating_capacity INT NOT NULL,
          bus_license_number VARCHAR(20) NOT NULL,
          origin VARCHAR(25) NOT NULL,
          destination VARCHAR(25) NOT NULL,
          trip_date VARCHAR(30) NOT NULL,
					fare INT NOT NULL,
					status VARCHAR(20) NOT NULL
        )`;

		this.queryBookings = `CREATE TABLE IF NOT EXISTS booking(
          id serial PRIMARY KEY,
          user_id INT NOT NULL,
          trip_id INT  NOT NULL,
          first_name VARCHAR(25) NOT NULL,
					last_name VARCHAR(25) NOT NULL,
					email VARCHAR(50) NOT NULL,
          seat_number VARCHAR (4) NOT NULL
        )`;
		this.initializeDatabase();
	}

	async query(sql, data = []) {
		const connection = await this.connect();
		if (data.length) {
			const dataQueryWithData = await connection.query(sql, data);
			return dataQueryWithData;
		}
		const dataQueryWithoutData = await connection.query(sql);
		return dataQueryWithoutData;
	}

	async initializeDatabase() {
		await this.query(this.queryUsers);
		await this.query(this.queryTrips);
		await this.query(this.queryBookings);
	}
}
export default new DatabaseInstance();
