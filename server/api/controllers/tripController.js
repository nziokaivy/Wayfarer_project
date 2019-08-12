import Trip from '../db/trip';

const TripController = {
    createNewTrip(req, res) {
        const { body } = req;
        if (!body.seating_capacity || !body.bus_license_number || !body.origin || !body.destination || !body.trip_date || !body.fare) {
            return res.status(400).json({
                status: 400,
                error: 'Bad Request! Please ensure you have filled in all the fields'
            });
        }
        const newTrip = Trip.createNewTrip(body);
        return res.status(201).json({
            status: 201,
            message: 'success',
            data: newTrip
        });
    },

    getAllTrips(req, res) {
        const allTrips = Trip.getAllTrips();
        if (!allTrips.length) {
            return res.status(404).json({
                status: 400,
                error: 'Not found'
            });
        }
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: allTrips
        });
    },

    getSpecificTrip(req, res) {

        const id = parseInt(req.params.id);
        const specificTrip = Trip.getSpecificTrip(id);
        if (isNaN(req.params.id)) {
            return res.status(404).json({
                status: 400,
                error: 'Please input an integer'
            });
        }
        if (!specificTrip) {
            return res.status(404).json({
                status: 404,
                error: 'Not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: specificTrip
        });
    },

    cancelTrip(req, res) {
        const id = parseInt(req.params.id);
        const trip = Trip.getSpecificTrip(id);
        const tripId = trip.id;
        const tripStatus = trip.status;
        if (!tripId) {
            return res.status(404).json({
                status: 400,
                error: 'Not found'
            });
        }
        if (tripStatus === 'cancel') {
            return res.status(409).json({
                status: 409,
                error: 'Trip already cancelled'
            });
        }
        Trip.cancelTrip(tripId);
        return res.status(200).json({
            status: 200,
            message: 'Trip was cancelled successfully!'
        });
    },
};

export default TripController;