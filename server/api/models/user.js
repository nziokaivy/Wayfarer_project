/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/Db';

class User {
	constructor() {
		this.users = [
			{
				id: 1,
				email: 'admin@gmail.com',
				first_name: 'admin',
				last_name: 'admin',
				password: 'Pass@123y',
				is_admin: true,
			},
			{
				id: 2,
				email: 'janedoe@gmail.com',
				first_name: 'Jane',
				last_name: 'Doe',
				password: 'Ivyme@123',
				is_admin: false,
			},
		];
	}

	async createNewUser({
		// eslint-disable-next-line camelcase
		email, first_name, last_name, password,
	}) {
		const userValues = [email, first_name, last_name, password];
		const queryData = 'INSERT INTO users(email, first_name, last_name, password) VALUES ($1, $2, $3, $4) returning *';
		const { rows } = await db.query(queryData, userValues);	
		if (rows.length > 0) {
			return rows;
		}
	}

	getUser(id) {
		return this.users.find(user => user.id === id);
	}

	getAllUsers() {
		return this.users;
	}

	async verifyEmail(email) {
		const confirmEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;
		const { rows } = await db.query(confirmEmailQuery);
		if (rows.length > 0) {
			return true;
		} return false;
	}
}
export default new User();
