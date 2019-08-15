import Trip from '../models/trip';

class TripController {
	static async createNewTrip(req, res) {
		const { body } = req;
		const newTrip = Trip.createNewTrip({ ...body });
		// const checkTrip = Trip.checkRepeatTrip(body.bus_license_number, body.trip_date);
		const tripValues = {
			...body,
		};
		// if (!await checkTrip) {
		// 	return res.status(409).json({
		// 		status: 409,
		// 		error: 'Trip already exists',
		// 	});
		// }
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

	static async getAllTrips(req, res) {
		const allTrips = Trip.getAllTrips();
		if (await allTrips) {
			return res.status(200).json({
				status: '200',
				message: 'success',
				data: await allTrips,
			});
		}
		return res.status(404).json({
			status: 'error',
			error: 'Not found',
		});
	}

	static async getSpecificTrip(req, res) {
		const id = parseInt(req.params.id);
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
		const { status } = req.body;
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
