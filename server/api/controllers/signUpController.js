/* eslint-disable import/no-named-as-default-member */
// eslint-disable-next-line import/no-named-as-default
import User from '../db/user';


const SignUp = {
	signup(req, res) {
		const {
			body,
		} = req;
		if (!body.first_name || !body.last_name || !body.email || !body.password) {
			return res.status(400).json({
				status: 'error',
				error: 'Bad Request! Please ensure you have filled in all the fields',
			});
		}
		const newUser = User.createNewUser(body);
		return res.status(201).json({
			status: 'success',
			data: newUser,
		});
	},
};
export default SignUp;
