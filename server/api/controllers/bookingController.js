import jwt from 'jsonwebtoken';
import User from '../models/user';
import Trip from '../models/trip';
import Booking from '../models/booking';

const removeBooking = (data) => {
	const remove = {
		id: data.id,
		bus_license_number: Trip.getSpecificTrip(data.trip_id).bus_license_number,
		trip_date: User.getUser(data.user_id).trip_date,
		first_name: User.getUser(data.user_id).first_name,
		last_name: User.getUser(data.user_id).last_name,
		user_email: User.getUser(data.user_id).email,
		seat_number: data.seat_number,
	};
	return remove;
};

class BookingController {
	static async booking(req, res) {
		const { body } = req;
		const newBooking = Booking.createNewBooking({ ...body });
		const bookingValues = {
			...body,
		};
		if (await newBooking) {
			return res.status(201).json({
				status: 201,
				data: bookingValues,
			});
		}	return res.status(400).json({
			status: 400,
			error: 'Could not create new booking',
		});
	}

	static async getAllBookings(req, res) {
		const allBookings = Booking.getAllBookings();
		if (await allBookings) {
			return res.status(200).json({
				status: '200',
				message: 'success',
				data: await allBookings,
			});
		}
		return res.status(404).json({
			status: '404',
			error: 'Not found',
		});
	}

	static getSpecificBooking(req, res) {
		// eslint-disable-next-line radix
		const bookingId = parseInt(req.params.id);
		const specificBooking = Booking.getSpecificBooking(bookingId);
		if (specificBooking) {
			const removedBooking = removeBooking(specificBooking);
			return res.status(200).json({ status: 'success', data: removedBooking });
		}
		return res.status(404).json({ status: 'error', error: 'Not found' });
	}

	static deleteBooking(req, res) {
		// eslint-disable-next-line radix
		const bookingId = parseInt(req.params.id);
		const findBooking = Booking.deleteBooking(bookingId);
		if (!findBooking) {
			return res.status(400).json({ status: 404, error: 'Booking id not found' });
		}
		return res.status(200).json({ status: '204', data: { message: 'Booking Deleted Successfully!' } });
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
