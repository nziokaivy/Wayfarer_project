/* eslint-disable radix */
// eslint-disable-next-line import/no-named-as-default
import Trip from '../models/trip';

class TripController {
	static async createNewTrip(req, res) {
		const { body } = req;
		// eslint-disable-next-line max-len

		const newTrip = Trip.createNewTrip({ ...body });
		const tripValues = {
			...body,
		};
		if (await newTrip) {
			return res.status(201).json({
				status: 201,
				data: tripValues,
			});
		}	return res.status(400).json({
			status: 400,
			error: 'Could not create new trip',
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
