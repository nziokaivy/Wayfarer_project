import Joi from '@hapi/joi';

const validateLogin = (data) => {
	const schema = Joi.object().keys({
		email: Joi.string().email(),
		password: Joi.string().min(8).required(),
	}).with('email', 'password');
	return Joi.validate(data, schema);
};

module.exports = {
	validateLogin,
};
