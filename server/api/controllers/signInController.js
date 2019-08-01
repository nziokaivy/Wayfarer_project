import User from '../db/user';

const SignIn = {
    signin(req, res) {
        const { body } = req;
        if(!body.email || !body.password) {
        return res.status(400).json({ status: 'error', error: 'Bad Request! Please ensure you have the correct email and password'});
        }
        const getUser = User.getAllUsers().find(user => user.email === body.email && user.password === body.password);
        if(!getUser) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }
        return res.status(200).json({ status: 'success', data: getUser});
        },
    };

export default SignIn;