import db from '../db/Db';
import HashedPassword from '../helpers/hashPassword';

class User {
	constructor() {
		this.user = null;
	}

	async createNewUser({
		email, first_name, last_name, passwordHashed,
	}) {
		const userValues = [email, first_name, last_name, passwordHashed];
		const queryData = 'INSERT INTO users(email, first_name, last_name, password) VALUES ($1, $2, $3, $4) returning *';
		const { rows } = await db.query(queryData, userValues);
		if (rows.length > 0) {
			return rows;
		}
	}

	async verifyEmail(email) {
		const confirmEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;
		const { rows } = await db.query(confirmEmailQuery);
		if (rows.length > 0) {
			this.user = rows[0];
			return this.user;
		}
		return false;
	}
}
export default new User();
