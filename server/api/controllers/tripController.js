/* eslint-disable radix */
// eslint-disable-next-line import/no-named-as-default
import Trip from '../db/trip';

class TripController {
	static createNewTrip(req, res) {
		const {
			body,
		} = req;
		// eslint-disable-next-line max-len
		if (!body.seating_capacity || !body.bus_license_number || !body.origin || !body.destination || !body.trip_date || !body.fare) {
			return res.status(400).json({
				status: 'error',
				error: 'Bad Request! Please ensure you have filled in all the fields',
			});
		}
		const newTrip = Trip.createNewTrip(body);
		return res.status(201).json({
			status: 'success',
			data: newTrip,
		});
	}

	static getAllTrips(req, res) {
		const allTrips = Trip.getAllTrips();
		if (!allTrips.length) {
			return res.status(404).json({
				status: 'error',
				error: 'Not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: allTrips,
		});
	}

	static getSpecificTrip(req, res) {
		const id = parseInt(req.params.id);
		const specificTrip = Trip.getSpecificTrip(id);
		if (!specificTrip) {
			return res.status(404).json({
				status: 'error',
				error: 'Not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: specificTrip,
		});
	}

	static cancelTrip(req, res) {
		const id = parseInt(req.params.id);
		const cancelTrip = Trip.cancelTrip(id);
		if (!cancelTrip) {
			return res.status(404).json({
				status: 'error',
				error: 'Not found',
			});
		}
		return res.status(200).json({
			status: 'success',
			data: cancelTrip,
		});
	}
}
export default TripController;
