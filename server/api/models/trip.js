import db from '../db/Db';

class Trip {
	constructor() {
		this.trips = [{
			id: 1,
			seating_capacity: 67,
			bus_license_number: 'KBE223T',
			origin: 'Mombasa',
			destination: 'Kampala',
			trip_date: '22-06-2019',
			fare: 9000,
			status: 'active',
		}];
	}

	async createNewTrip({
		bus_license_number,
		seating_capacity,
		origin,
		destination,
		trip_date,
		fare,
	}) {
		const tripValues = [bus_license_number, seating_capacity, origin, destination, trip_date, fare, 'active'];
		const queryData = `INSERT INTO trips(bus_license_number, seating_capacity, origin, destination, trip_date, fare, status) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
		const {
			rows,
		} = await db.query(queryData, tripValues);
		if (rows.length > 0) {
			return rows;
		}
	}

	async getAllTrips() {
		const findAllTripsQuery = `SELECT * FROM trips`;
		const {
			rows,
		} = await db.query(findAllTripsQuery);
		if (rows.length === 0) {
			return false;
		}
		const result = rows;
		return result;
	}

	async getSpecificTrip(id) {
		const tripId = parseInt(id);
		const findTripQuery = `SELECT * FROM trips WHERE id ='${tripId}'`;
		const {
			rows,
		} = await db.query(findTripQuery);
		if (rows.length === 0) {
			return false;
		}
		const result = rows[0];
		return result;
	}

	async checkRepeatTrip(bus_license_number, trip_date) {
		const findTripQuery = `SELECT * FROM trips WHERE bus_license_number = '${bus_license_number} AND trip_date = '${trip_date}'`;
		const { rows } = await db.query(findTripQuery);
		if (rows.length === 0) {
			return false;
		}
		if (rows.length > 0) {
			return true;
		}
	}

	async cancelTrip(id, status) {
		const tripId = parseInt(id, 10);
		const findtripQuery = `SELECT *  FROM trips WHERE id = '${tripId}'`;
		const {
			rows,
		} = await db.query(findtripQuery);
		if (rows.length === 0) {
			return false;
		}
		if (rows[0].status === 'canceled') {
			const result = {
				status: 400,
				message: `This trip is already canceled`,
			};
			return false;
		} else {
			const updateTripStatusQuery = `UPDATE trips SET status ='${status}'  WHERE id = '${tripId}' returning *;`;
			const {
				rows,
			} = await db.query(updateTripStatusQuery);
			if (rows.length === 0) {
				const result = {
					status: 404,
					message: 'Trip not found',
				};
				return false;
			}
			const result = rows[0];
			return result;
		}
	}
}

export default new Trip();
