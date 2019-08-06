import User from '../db/user';
import loginValidation from '../helpers/signInValidators';
import createToken from '../middleware/authorization';

const SignIn = {
    signin(req, res) {
        const { body } = req;

        const { error } = loginValidation.validateLogin(body);
        if (error){
            return res.status(400).json({ status: 'error', error: error.details[0].message})
        }
        const getUser = User.getAllUsers().find(user => user.email === body.email && user.password === body.password);
        if(!getUser) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }
        const compare = getUser.password === body.password;
        if (!compare) {
            return res.status(401).json({ status: 'error', error: 'Incorrect password' });
        }
        const token = createToken.createToken(getUser);
        getUser.token = token;
        return res.status(200).json({ status: 'success', data: getUser });
    
        },
    };
    


export default SignIn;