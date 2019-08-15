import { Pool } from 'pg';
import dotenv from 'dotenv';
import HashedPassword from '../helpers/hashPassword';
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
					password  VARCHAR(200) NOT NULL,
					is_admin BOOLEAN NOT NULL DEFAULT false
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
		this.createAdmin();
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

	async createAdmin() {
		const admin = `SELECT * FROM users where email='${process.env.EMAIL}'`;
		const {
			rows,
		} = await this.query(admin);
		if (rows.length === 0) {
			const passwordHashed = HashedPassword.hashPassword(process.env.PASSWORD);
			const adminUser = {
				first_name: 'admin',
				last_name: 'admin',
				email: process.env.EMAIL,
				password: passwordHashed,
				is_admin: true,
			};
			const sqlAdmin = 'INSERT INTO users (first_name, last_name, email, password, is_admin) values($1, $2, $3, $4, $5) returning *';
			// eslint-disable-next-line max-len
			const value = [adminUser.first_name, adminUser.last_name, adminUser.email, adminUser.password, adminUser.is_admin];
			// eslint-disable-next-line no-unused-vars
			const dataEntry = await this.query(sqlAdmin, value);
		}
	}
}
export default new DatabaseInstance();
