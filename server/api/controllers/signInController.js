/* eslint-disable import/no-named-as-default-member */
// eslint-disable-next-line import/no-named-as-default
import User from '../db/user';
import loginValidation from '../helpers/signInValidators';

const SignIn = {
	signin(req, res) {
		const {
			body,
		} = req;

		const {
			error,
		} = loginValidation.validateLogin(body);
		if (error) {
			return res.status(400).json({
				status: 'error',
				error: error.details[0].message,
			});
		}
		// eslint-disable-next-line max-len
		const getUser = User.getAllUsers().find(user => user.email === body.email && user.password === body.password);
		if (!getUser) {
			return res.status(404).json({
				status: 'error',
				error: 'User not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: getUser,
		});
	},
};
export default SignIn;
