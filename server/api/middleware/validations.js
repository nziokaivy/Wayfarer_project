import Joi from '@hapi/joi';
import User from '../db/user';

class allValidations {
    static signup(req,res,next) {
        const { first_name,last_name,email,password,} = req.body;
        if (!first_name) {
			return res.status(400).json({status:'error', messgage:'Please fill in your first name'});
        }
        if (!last_name) {
			return res.status(400).json({status:'error', messgage:'Please fill in your last name'});
        }
        if (!email) {
			return res.status(400).json({status:'error', messgage:'Please fill in your email address'});
        }
        if (!password) {
			return res.status(400).json({status:'error', messgage:'Please fill in a password of your choice'});
        }
        
        if (!first_name || !last_name || !email || !password) {
			return res.status(400).json({status:'error', messgage:'Ensure you have fill in: first name,last name, email and password'});
        }

        const schema = Joi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            email: Joi.string().trim().required(),
            password: Joi.string().min(8).required(),
        });
        next();
        return Joi.validate({ first_name,last_name,email,password }, schema);
    }

    
    static signin(req,res,next) {
        const data = req.body;
        const schema = Joi.object().keys({
            email: Joi.string().trim().required(),
            password: Joi.string().min(8).required(),
        });
        next();
        return Joi.validate(data, schema);
    }

    static async validateEmail(req, res, next) {
		const { email } = req.body;
		const checkEmail = await User.verifyEmail(email);
		if (checkEmail) {
            return res.status(409).json({ status: 'error', error: 'Email already exist.Please use another one' });
		}
		next();
	}

}
export default allValidations;