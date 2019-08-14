import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
class Token {
	// eslint-disable-next-line camelcase
	static genToken(id, is_admin, email, first_name, last_name) {
		const payload = {
			id, is_admin, email, first_name, last_name,
		};
		const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 * 7 });
		return token;
	}
}
export default Token;
