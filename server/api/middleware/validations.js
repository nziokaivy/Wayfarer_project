/* eslint-disable camelcase */
import Joi from '@hapi/joi';
import Extension from '@hapi/joi-date';
import User from '../db/user';

const dateJoi = Joi.extend(Extension);

class allValidations {
	static signup(req, res, next) {
		const {
			first_name, last_name, email, password,
		} = req.body;
		if (!first_name) {
			return res.status(400).json({ status: 400, error: 'Please fill in your first name' });
		}
		if (!last_name) {
			return res.status(400).json({ status: 400, error: 'Please fill in your last name' });
		}
		if (!email) {
			return res.status(400).json({ status: 400, error: 'Please fill in your email address' });
		}
		if (!password) {
			return res.status(400).json({ status: 400, error: 'Please fill in a password of your choice' });
		}
		if (!first_name || !last_name || !email || !password) {
			return res.status(400).json({ status: 400, error: 'Ensure you have fill in: first name,last name, email and password' });
		}

		const schema = Joi.object().keys({
			first_name: Joi.string().regex(/^[A-Za-z]{3,}/).trim().required()
				.error(new Error('Please ensure your first name exceeds 3 letters')),
			last_name: Joi.string().regex(/^[a-zA-Z]{3,}/).trim().required()
				.error(new Error('Please ensure your last name exceeds 3 letters')),
			email: Joi.string().regex(/(^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-z]+$)/).trim().required()
				.error(new Error('Please ensure your email address is in the format username@gmail.com')),
			password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/).required().error(new Error('Please ensure your password has a minimum of 8 characters, capital letters, an alphanumeric and a number')),
		});
		return Joi.validate({
			first_name, last_name, email, password,
		}, schema, (error) => {
			if (error) {
				return res.status(400).json({
					status: 400,
					error: error.message,
				});
			}
			next();
		});
	}

	static signin(req, res, next) {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).json({ status: 400, error: 'Please fill in your email address' });
		}
		if (!password) {
			return res.status(400).json({ status: 400, error: 'Please fill in your password' });
		}
		next();
	}

	static validateTrip(req, res, next) {
		const {
			seating_capacity, bus_license_number, origin, destination, trip_date, fare,
		} = req.body;
		if (!seating_capacity) {
			return res.status(400).json({ status: 400, error: 'Please fill in seating capacity' });
		}
		if (!bus_license_number) {
			return res.status(400).json({ status: 400, error: 'Please fill in the bus license number' });
		}
		if (!origin) {
			return res.status(400).json({ status: 400, error: 'Please fill in the origin of the trip' });
		}
		if (!destination) {
			return res.status(400).json({ status: 400, error: 'Please fill in the destination of your trip' });
		}
		if (!trip_date) {
			return res.status(400).json({ status: 400, error: 'Please fill in the trip date' });
		}
		if (!fare) {
			return res.status(400).json({ status: 400, error: 'Please fill in the charges of the trip' });
		}
		// eslint-disable-next-line max-len
		if (!seating_capacity || !bus_license_number || !origin || !destination || !trip_date || !fare) {
			return res.status(400).json({ status: 400, error: 'Ensure you have fill in: the seating capacity, the bus license number,the trip\'s origin, the trip\'s destination, trip date, fare,status' });
		}
		const schema = Joi.object().keys({
			seating_capacity: Joi.string().regex(/^[1-9]+$/).trim().required()
				.error(new Error('Please ensure the seating capacity entered is a number only')),
			bus_license_number: Joi.string().regex(/^([a-zA-Z])+(\s)+[0-999]+$/).trim().required()
				.error(new Error('Please ensure the bus license number follows a specified format e.g, KVB 234 ')),
			origin: Joi.string().regex(/^[a-zA-Z]{3,}$/).trim().required()
				.error(new Error('Please ensure that the origin is a string and has a minimum of 3 letters.')),
			destination: Joi.string().regex(/^[a-zA-Z]{3,}$/).required().error(new Error('Please ensure that the destination is a string and has a minimum of 3 letters.')),
			trip_date: dateJoi.date().min(new Date()).format(['DD/MM/YYYY']).iso()
				.required()
				.error(new Error('Please ensure your trip date follows this format: DD/MM/YYYY')),
			fare: Joi.string().regex(/^[0-9]*$/).required().error(new Error('Please ensure that the fare amount is only a number')),
		});
		return Joi.validate({
			seating_capacity, bus_license_number, origin, destination, trip_date, fare,
		}, schema, (error) => {
			if (error) {
				return res.status(400).json({
					message: error.message,
				});
			}
			next();
		});
	}

	static validateId(req, res, next) {
		const { id } = req.params;
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(id)) {
			return res.status(400).json({
				status: 400,
				error: 'id must be an integer',
			});
		}
		next();
	}

	static async validateEmail(req, res, next) {
		const { email } = req.body;
		const checkEmail = await User.verifyEmail(email);
		if (checkEmail) {
			return res.status(409).json({ status: 409, error: 'Email already exist.Please use another one' });
		}
		next();
	}

	static validateBooking(req, res, next) {
		const { trip_id, seat_number } = req.body;
		if (!trip_id) {
			return res.status(400).json({ status: 400, error: 'Please fill in the trip id' });
		}
		if (!seat_number) {
			return res.status(400).json({ status: 400, error: 'Please fill in your seat number' });
		}

		const schema = Joi.object().keys({
			trip_id: Joi.string().regex(/^[1-9]+$/).trim().required()
				.error(new Error('Please ensure that the trip id is an integer only')),
			seat_number: Joi.string().regex(/^[1-9]+$/).trim().required()
				.error(new Error('Please ensure that the seat number is an integer only')),

		});
		return Joi.validate({ trip_id, seat_number }, schema, (error) => {
			if (error) {
				return res.status(400).json({
					status: 400,
					error: error.message,
				});
			}
			next();
		});
	}
}
export default allValidations;
