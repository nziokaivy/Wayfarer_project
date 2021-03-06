import jwt from 'jsonwebtoken';
import Booking from '../models/booking';

class BookingController {
	static async booking(req, res) {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.body.data = decodedToken;
		const {
			body
		} = req;
		const newBooking = Booking.createNewBooking({
			...body
		});
		const bookingValues = {
			...body,
		};
		if (!await newBooking) {
			return res.status(409).json({
				status: 409,
				error: 'Booking has already been created.Cannot duplicate a booking',
			});
		}
		return res.status(201).json({
			status: 201,
			data: bookingValues,
		});
	}

	static async getAllBookings(req, res) {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.body.data = decodedToken;
		const { is_admin } = req.body.data;
		if (is_admin) {
			const allBookings = Booking.getAllBookings();
			console.log(await allBookings);
			
			if (await allBookings) {
				return res.status(200).json({
					status: 200,
					message: 'success',
					data: await allBookings,
				});
			}
			return res.status(404).json({
				status: 404,
				error: 'Not found',
			});
		} const {
			email,
		} = req.body.data;
		const userBookings = Booking.getOnlyBookingsByUser(email);
		if (userBookings) {
			return res.status(200).json({
				status: 200,
				message: 'success',
				data: await userBookings,
			});
		}
		return res.status(404).json({
			status: 404,
			message: 'You do not have any existing bookings!',
		});
	}

	static async deleteBooking(req, res) {
		const bookingId = parseInt(req.params.id);
		const findBooking = Booking.deleteBooking(bookingId);
		if (await findBooking) {
			return res.status(200).json({
				status: 200,
				data: {
					message: 'Booking Deleted Successfully!'
				}
			});
		}
		return res.status(400).json({
			status: 404,
			error: 'Booking id not found'
		});
	}

	static async bookingsByUserOnly(req, res) {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.body.data = decodedToken;
		const {
			email,
		} = req.body.data;
		const userBookings = Booking.getOnlyBookingsByUser(email);
		if (userBookings) {
			return res.status(200).json({
				status: 200,
				message: 'success',
				data: await userBookings,
			});
		}
		return res.status(404).json({
			status: 404,
			message: 'You do not have any existing bookings!',
		});
	}
}


export default BookingController;
