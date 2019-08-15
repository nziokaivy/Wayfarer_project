import db from '../db/Db';

class Booking {
	// eslint-disable-next-line no-useless-constructor
	constructor() {}

	async createNewBooking({
		user_id,
		trip_id,
		first_name,
		last_name,
		email,
		seat_number,
	}) {
		const bookingValues = [user_id, trip_id, first_name, last_name, email, seat_number];
		const queryData = `INSERT INTO booking(user_id,trip_id, first_name, last_name, email, seat_number) VALUES ($1, $2, $3, $4, $5, $6) returning *`;
		const {
			rows,
		} = await db.query(queryData, bookingValues);
		if (rows.length > 0) {
			return rows;
		}
	}

	async getAllBookings() {
		const findAllBookingsQuery = 'SELECT *  FROM booking';
		const { rows } = await db.query(findAllBookingsQuery);
		if (rows.length === 0) {
			return false;
		}
		const result = rows;
		return result;
	}

	async deleteBooking(id) {
		const booking_Id = parseInt(id);
		const findBookingQuery = `SELECT * FROM bookings WHERE id = '${booking_Id}'`;
		const {
			rows,
		} = await db.query(findBookingQuery);
		if (rows.length === 0) {
			return false;
		} else {
			const foundBookingQuery = `DELETE FROM bookings WHERE id ='${booking_Id}'`;
			const {
				rows,
			} = await db.query(foundBookingQuery);
			if (!rows) {
				const result = {
					status: 401,
					message: 'You are not allowed to delete this booking.',
				};
				return false;
			}
			this.result = {
				status: 200,
				message: 'You have successfully deleted this booking.',
			};
			return true;
		}
	}

	async getOnlyBookingsByUser(email) {
		const getBookingsByUserQuery = `SELECT * FROM booking WHERE email = '${email}'`;
		const { rows } = await db.query(getBookingsByUserQuery);
		if (rows.length === 0) {
			const result = 'You have no booking records yet.';
			return result;
		}
		const result = rows;
		return result;
	}

	getSpecificBooking(id) {
		return this.bookings.find(booking => booking.booking_id === id);
	}
}
export default new Booking();
