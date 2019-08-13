/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
/* eslint-disable space-before-blocks */
// eslint-disable-next-line import/no-named-as-default-member
import User from '../db/user';
import createToken from '../helpers/authToken';

class Users{
	static signup(req, res) {
		// eslint-disable-next-line camelcase
		const {
			first_name, last_name, email, password,
		} = req.body;
		const newUser = User.createNewUser({
			first_name, last_name, email, password,
		});
		// eslint-disable-next-line max-len
		const token = createToken.genToken(newUser.id, newUser.is_admin, newUser.email, newUser.first_name, newUser.last_name);
		newUser.token = token;
		if (newUser !== null) {
			return res.status(201).json({
				status: 201,
				message: 'success',
				data: newUser,
			});
		}
		return res.status(400).json({
			status: 400,
			message: 'error could not create new account',
		});
	}

	static signin(req, res) {
		const { email, password } = req.body;
		// eslint-disable-next-line max-len
		const getUser = User.getAllUsers().find(user => user.email === email && user.password === password);
		if (!getUser) {
			return res.status(404).json({
				status: 404,
				error: 'Invalid email and password',
			});
		}
		const getPassword = getUser.password === password;
		if (!getPassword) {
			return res.status(401).json({
				status: 401,
				error: 'Invalid email and password',
			});
		}
		// eslint-disable-next-line max-len
		const token = createToken.genToken(getUser.id, getUser.is_admin, getUser.email, getUser.first_name, getUser.last_name);
		getUser.token = token;
		return res.status(200).json({
			status: 200,
			message: 'success',
			data: getUser,
		});
	}
}
export default Users;
