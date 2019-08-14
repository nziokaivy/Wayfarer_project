/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import db from '../db/Db';

class Trip {
	constructor() {
		this.trips = [
			{
				id: 1,
				seating_capacity: 67,
				bus_license_number: 'KBE223T',
				origin: 'Mombasa',
				destination: 'Kampala',
				trip_date: '22-06-2019',
				fare: 9000,
				status: 'active',
			},
		];
	}

	async createNewTrip({
		bus_license_number, seating_capacity, origin, destination, trip_date, fare,
	}) {
		// eslint-disable-next-line max-len
		const tripValues = [bus_license_number, seating_capacity, origin, destination, trip_date, fare, 'active'];
		const queryData = `INSERT INTO trips(bus_license_number, seating_capacity, origin, destination, trip_date, fare, status) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
		const { rows } = await db.query(queryData, tripValues);
		if (rows.length > 0) {
			return rows;
		}
	}

	getAllTrips() {
		return this.trips;
	}

	getSpecificTrip(id) {
		return this.trips.find(trip => trip.id === id);
	}

	cancelTrip(id) {
		const trip = this.getSpecificTrip(id);
		trip.status = 'cancel';
		return trip;
	}
}

export default new Trip();
