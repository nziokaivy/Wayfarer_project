import jwt from 'jsonwebtoken';
import Booking from '../db/booking';
import User from '../db/user';

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

const BookingController = {
	booking(req, res) {
		const {
			body,
		} = req;

		if (!body.trip_id || !body.user_id || !body.seat_number) {
			return res.status(400).json({
				status: 'error',
				error: 'Bad Request! Please ensure you have filled in all the fields',
			});
		}
		const newBooking = Booking.createNewBooking(body);
		return res.status(201).json({
			status: 'success',
			data: newBooking,
		});
	},

	getAllBookings(req, res) {
		const allBookings = Booking.getAllBookings();
		if (!allBookings.length) {
			return res.status(404).json({
				status: 'error',
				error: 'Not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: allBookings,
		});
	},

	getSpecificBooking(req, res) {
		const bookingId = parseInt(req.params.id);
		const specificBooking = Booking.getSpecificBooking(bookingId);
		if (specificBooking) {
			const removedBooking = removeBooking(specificBooking);
			return res.status(200).json({
				status: 'success',
				data: removedBooking,
			});
		}
		return res.status(404).json({
			status: 'error',
			error: 'Not found',
		});
	},

	deleteBooking(req, res) {
		const bookingId = parseInt(req.params.id);
		const specificBooking = Booking.getSpecificBooking(bookingId);
		if (!specificBooking) {
			return res.status(404).json({
				status: 'error',
				error: 'Not Found',
			});
		}
		Booking.deleteBooking(bookingId);
		return res.status(204).json({
			status: 'success',
			data: {
				message: 'Booking Deleted Successfully!',
			},
		});
	},
};

export default BookingController;
