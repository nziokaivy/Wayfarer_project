import User from '../models/user';
import createToken from '../helpers/authToken';
import HashedPassword from '../helpers/hashPassword';

class Users {
	static async signup(req, res) {
		const { body } = req;

		const passwordHashed = HashedPassword.hashPassword(body.password);
		const newUser = User.createNewUser({
			...body,
			password: undefined,
			passwordHashed,
		});
		// eslint-disable-next-line max-len
		const token = createToken.genToken(newUser.id, newUser.email, newUser.first_name, newUser.last_name, newUser.is_admin);
		const userData = {
			token,
			...body,
			password: undefined,
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
			error: 'error could not create new account',
		});
	}

	static async signin(req, res) {
		const {
			email,
			userpassword,
		} = req.body;
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
