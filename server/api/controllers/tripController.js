import Trip from '../db/trip';

const TripController = {
    createNewTrip(req, res) {
        const { body } =req;
        if(!body.seating_capacity || !body.bus_license_number || !body.origin || !body.destination || !body.trip_date || !body.fare || !body.status) {
            return res.status(400).json({ status: 'error', error: 'Bad Request! Please ensure you have filled in all the fields'});
        }
        const newTrip = Trip.createNewTrip(body);
        return res.status(201).json({ status: 'success', data: newTrip});
    },

    getAllTrips(req, res) {
        const allTrips = Trip.getAllTrips();
        if(!allTrips.length) {
            return res.status(404).json({ status: 'error', error: 'Not found'});
        }
        return res.status(200).json({ status: 'success', data: allTrips});
    },
};

export default TripController;