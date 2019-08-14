/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import db from '../db/Db';

class Booking {
	// eslint-disable-next-line no-useless-constructor
	constructor() {}

	// eslint-disable-next-line class-methods-use-this
	async createNewBooking({
		// eslint-disable-next-line camelcase
		user_id,
		trip_id,
		first_name,
		last_name,
		email,
		seat_number,
	}) {
		// eslint-disable-next-line max-len
		const bookingValues = [user_id, trip_id, first_name, last_name, email, seat_number];
		const queryData = `INSERT INTO booking(user_id,trip_id, first_name, last_name, email, seat_number) VALUES ($1, $2, $3, $4, $5, $6) returning *`;
		const {
			rows,
		} = await db.query(queryData, bookingValues);
		if (rows.length > 0) {
			return rows;
		}
	}

	// eslint-disable-next-line class-methods-use-this
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
		// eslint-disable-next-line radix
		const booking_Id = parseInt(id);
		const findBookingQuery = `SELECT * FROM bookings WHERE id = '${booking_Id}'`;
		const {
			rows,
		} = await db.query(findBookingQuery);
		if (rows.length === 0) {
			return false;
		// eslint-disable-next-line no-else-return
		} else {
			const foundBookingQuery = `DELETE FROM bookings WHERE id ='${booking_Id}'`;
			const {
				// eslint-disable-next-line no-shadow
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

	getOnlyBookingsByUser(email) {
		const myBookings = this.bookings.find(data => data.email === email);

		if (myBookings === undefined) {
			this.result = 'You have no existing booking.';
			return false;
		}
		this.result = myBookings;
		return myBookings;
	}

	getSpecificBooking(id) {
		return this.bookings.find(booking => booking.booking_id === id);
	}
}
export default new Booking();
