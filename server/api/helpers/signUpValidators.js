import Joi from '@hapi/joi';

const validateSignUp = (data) => {
	const schema = Joi.object().keys({
		first_name: Joi.string().trim().required(),
		last_name: Joi.string().trim().required(),
		email: Joi.string().trim().required(),
		password: Joi.string().min(8).required(),
	});
	return Joi.validate(data, schema);
};

module.exports = {
	validateSignUp,
};
