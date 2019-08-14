/* eslint-disable no-shadow */
/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
/* eslint-disable space-before-blocks */
// eslint-disable-next-line import/no-named-as-default-member
import User from '../models/user';
import createToken from '../helpers/authToken';
import HashedPassword from '../helpers/hashPassword';

class Users {
	static async signup(req, res) {
		// eslint-disable-next-line camelcase
		const {
			email,
			first_name,
			last_name,
			password,
		} = req.body;

		const passwordHashed = HashedPassword.hashPassword(password);
		const newUser = User.createNewUser({
			email,
			first_name,
			last_name,
			passwordHashed,
		});
		// eslint-disable-next-line max-len
		const token = createToken.genToken(newUser.id, newUser.email, newUser.first_name, newUser.last_name, newUser.is_admin);
		const userData = {
			token,
			first_name,
			last_name,
			email,
		};
		if (await newUser !== null) {
			newUser.token = token;
			return res.status(201).json({
				status: 201,
				message: 'success',
				data: await userData,
			});
		}
		return res.status(400).json({
			status: 400,
			message: 'error could not create new account',
		});
	}

	static async signin(req, res) {
		const {
			email,
			userpassword,
		} = req.body;
		// eslint-disable-next-line max-len
		const getUser = User.verifyEmail(email);

		if (await getUser) {
			const {
				id,
				first_name,
				last_name,
				password,
				is_admin,
			} = await getUser;
			const comparePasword = HashedPassword.comparePassword(password, userpassword);
			if (comparePasword) {
				// eslint-disable-next-line max-len
				const token = createToken.genToken(id, is_admin, email, first_name, last_name);
				const userData = {
					token,
					first_name,
					last_name,
					email,
				};
				return res.status(200).json({
					status: 200,
					message: 'success',
					data: await userData,
				});
			}
			return res.status(404).json({
				status: 404,
				error: 'Invalid email or password',
			});
		}
		return res.status(404).json({
			status: 404,
			error: 'Invalid email or password',
		});
	}
}
export default Users;
