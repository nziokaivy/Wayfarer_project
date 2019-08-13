import jwt from 'jsonwebtoken';
import Booking from '../db/booking';
import User from '../db/user';
import Trip from '../db/trip';

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
	static booking(req, res) {
		const { body } = req;

		if (!body.trip_id || !body.user_id || !body.seat_number) {
			return res.status(400).json({ status: 'error', error: 'Bad Request! Please ensure you have filled in all the fields' });
		}
		const newBooking = Booking.createNewBooking(body);
		return res.status(201).json({ status: 'success', data: newBooking });
	}

	static getAllBookings(req, res) {
		const allBookings = Booking.getAllBookings();
		if (!allBookings.length) {
			return res.status(404).json({ status: 'error', error: 'Not found' });
		}
		return res.status(200).json({ status: 'success', data: allBookings });
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
		const specificBooking = Booking.getSpecificBooking(bookingId);
		if (!specificBooking) {
			return res.status(404).json({ status: 'error', error: 'Not Found' });
		}
		Booking.deleteBooking(bookingId);
		return res.status(204).json({ status: 'success', data: { message: 'Booking Deleted Successfully!' } });
	}

	static bookingsByUserOnly(req, res) {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.JWT_KEY);
		req.body.data = decodedToken;
		const {
			email,
		} = req.body.data;
		const userBookings = Booking.getOnlyBookingsByUser(email);
		if (!userBookings) {
			return res.status(404).json({
				status: 404,
				message: 'You do not have any existing bookings!',
			});
		}
		return res.status(200).json({
			status: 200,
			message: 'success',
			data: userBookings,
		});
	}
}
export default BookingController;
