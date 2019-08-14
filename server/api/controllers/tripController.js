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

	static async getSpecificTrip(req, res) {
		const id = parseInt(req.params.id);
		// eslint-disable-next-line prefer-destructuring
		const status = req.body.status;
		const specificTrip = Trip.getSpecificTrip(id);
		if (await specificTrip) {
			return res.status(200).json({
				status: 'success',
				data: await specificTrip,
			});
		}
		if (!specificTrip) {
			return res.status(404).json({
				status: 'error',
				error: 'Not found',
			});
		}
	}

	static async cancelTrip(req, res) {
		const id = parseInt(req.params.id);
		// eslint-disable-next-line prefer-destructuring
		const status = req.body.status;
		// eslint-disable-next-line prefer-destructuring
		const cancelTrip = Trip.cancelTrip(id, status);
		if (await cancelTrip) {
			return res.status(200).json({
				status: '200',
				data: await cancelTrip,
			});
		}
		return res.status(404).json({
			status: '404',
			error: 'Not Found',
		});
	}
}
export default TripController;
