import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Trip from '../api/db/trip';

const should = chai.should();
chai.use(chaiHttp);

describe('Trip Tests', () => {
	// TEST FOR POST  NEW TRIP
	it('POST/api/v1/trips Should create a new trip', (done) => {
		const trip = {
			id: Trip.getAllTrips().length + 1,
			seating_capacity: 67,
			bus_license_number: 'KZE432Y',
			origin: 'Nairobi',
			destination: 'Kigali',
			trip_date: '23-07-2019',
			fare: 4000,
			status: 1,
		};
		chai
			.request(app)
			.post('/api/v1/trips')
			.send(trip)
			.end((err, res) => {
				res.should.have.status(201);
				res.should.should.be.a('object');
				done();
			});
	});
	// TEST FOR GET ALL TRIPS
	it('GET/api/v1/trips Should fetch all trips', (done) => {
		chai
			.request(app)
			.get('/api/v1/trips')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.should.be.a('object');
				done();
			});
	});
	// GET A SPECIFIC TRIP TEST
	it('GET/api/v1/trips/:trip-id Should fetch a specific trip', (done) => {
		const trip = {
			id: Trip.getAllTrips().length + 1,
			seating_capacity: 67,
			bus_license_number: 'KZE432Y',
			origin: 'Nairobi',
			destination: 'Kigali',
			trip_date: '23-07-2019',
			fare: 4000,
			status: 1,
		};
		const tripId = Trip.createNewTrip(trip).id;
		chai
			.request(app)
			.get(`/api/v1/trips/${tripId}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.should.be.a('object');
				done();
			});
	});
	// CANCEL A TRIP TEST
	it('PATCH/api/v1/trips/:trip-id/cancel Should cancel all trips', (done) => {
		const trip = {
			id: Trip.getAllTrips().length + 1,
			seating_capacity: 67,
			bus_license_number: 'KZE432Y',
			origin: 'Nairobi',
			destination: 'Kigali',
			trip_date: '23-07-2019',
			fare: 4000,
			status: 1,
		};
		const tripId = Trip.createNewTrip(trip).id;
		chai
			.request(app)
			.patch(`/api/v1/trips/${tripId}/cancel`)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.should.be.a('object');
				done();
			});
	});
});
