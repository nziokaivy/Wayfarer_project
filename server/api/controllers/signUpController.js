import User from '../db/user';
import signUpValidation from '../helpers/signUpValidators';
import createToken from '../middleware/authorization';

const SignUp = {
    signup(req, res) {
        const { body } =req;
        if(!body.first_name || !body.last_name || !body.email || !body.password) {
            return res.status(400).json({ status: 'error', error: 'Bad Request! Please ensure you have filled in all the fields'});
        }
        // const { error } = signUpValidation.validateSignUp(body);
        // if (error){
        //     return res.status(400).json({ status: 'error', error: error.details[0].message})
        // }
        const newUser = User.createNewUser(body);
        const token = createToken.createToken(newUser);
        newUser.token = token;
        return res.status(201).json({ status: 'success', data: newUser});


    },
};

export default SignUp;