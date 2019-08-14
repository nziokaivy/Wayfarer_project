/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import db from '../db/Db';

class Booking {
	constructor() {
		this.bookings = [{
			booking_id: 1,
			trip_id: 1,
			user_id: 1,
			bus_license_number: 'KGA 344R',
			trip_date: '21/09/2019',
			first_name: 'John',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: 23,
		},
		{
			booking_id: 2,
			trip_id: 1,
			user_id: 1,
			bus_license_number: 'KGA 344R',
			trip_date: '21/10/2019',
			first_name: 'John',
			last_name: 'Doe',
			email: 'maryjane@gmail.com',
			seat_number: 24,
		},
		{
			booking_id: 3,
			trip_id: 1,
			user_id: 2,
			bus_license_number: 'KGA 344R',
			trip_date: '21/11/2019',
			first_name: 'Test',
			last_name: 'User',
			email: 'testuser@gmail.com',
			seat_number: 34,
		},
		{
			booking_id: 4,
			trip_id: 1,
			user_id: 2,
			bus_license_number: 'KTZ 590M',
			trip_date: '21/09/2019',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'janedoe@gmail.com',
			seat_number: 4,
		},
		];
	}

	createNewBooking({
		// eslint-disable-next-line camelcase
		trip_id,
		seat_number,
		first_name,
		last_name,
		email,
	}) {
		const tripId = this.bookings.filter(trip => trip.trip_id === trip_id);
		if (!tripId) {
			return false;
		}
		const newBooking = {
			id: this.bookings.length + 1,
			trip_id,
			seat_number,
			first_name,
			last_name,
			email,

		};
		this.bookings.push(newBooking);
		return newBooking;
	}

	getAllBookings() {
		return this.bookings;
	}

	async deleteBooking(id) {
		// eslint-disable-next-line radix
		const booking_Id = parseInt(id);
		const findBookingQuery = `SELECT *  FROM bookings WHERE id = '${booking_Id}'`;
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
