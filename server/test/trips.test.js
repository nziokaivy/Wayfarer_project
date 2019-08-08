import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Trip from '../api/db/trip';
import Token from '../api/helpers/authToken';

const should = chai.should();
chai.use(chaiHttp);


const adminToken = Token.genToken(1, true, 'admin@test.com', 'admin', 'test');
const userToken = Token.genToken(2, false, 'user@test.com', 'user', 'test');

describe('Trip Tests', () => {
    // TEST FOR CREATING A NEW TRIP
    it('POST/api/v1/trips Should create a new trip', (done) => {
        const trip = {
            seating_capacity: '67',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: 'Kigali',
            trip_date: '23/08/2019',
            fare: '4000',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.should.be.a('object');
                done();
            });
    });

    // TEST FOR CANNOT CREATE A NEW TRIP WITH A MISSING SEATING CAPACITY
    it('POST/api/v1/trips Should not create a new trip if seating capacit is missing', (done) => {
        const trip = {
            seating_capacity: '',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: 'Kigali',
            trip_date: '23/08/2019',
            fare: '4000',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    // TEST FOR CANNOT CREATE A NEW TRIP WITH A MISSING BUS LICENSE NUMBER
    it('POST/api/v1/trips Should not create a new trip if bus license number is missing', (done) => {
        const trip = {
            seating_capacity: '23',
            bus_license_number: '',
            origin: 'Nairobi',
            destination: 'Kigali',
            trip_date: '23/08/2019',
            fare: '4000',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    // TEST FOR CANNOT CREATE A NEW TRIP WITH A MISSING ORIGIN
    it('POST/api/v1/trips Should not create a new trip if origin is missing', (done) => {
        const trip = {
            seating_capacity: '23',
            bus_license_number: 'KZE 432',
            origin: '',
            destination: 'Kigali',
            trip_date: '23/08/2019',
            fare: '4000',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    // TEST FOR CANNOT CREATE A NEW TRIP WITH A MISSING DESTINATION
    it('POST/api/v1/trips Should not create a new trip if destination is missing', (done) => {
        const trip = {
            seating_capacity: '23',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: '',
            trip_date: '23/08/2019',
            fare: '4000',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    // TEST FOR CANNOT CREATE A NEW TRIP WITH A MISSING TRIP DATE
    it('POST/api/v1/trips Should not create a new trip if trip date is missing', (done) => {
        const trip = {
            seating_capacity: '23',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: 'KIgali',
            trip_date: '',
            fare: '4000',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    // TEST FOR CANNOT CREATE A NEW TRIP WITH A MISSING FARE
    it('POST/api/v1/trips Should not create a new trip if fare is missing', (done) => {
        const trip = {
            seating_capacity: '23',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: 'KIgali',
            trip_date: '23/08/2019',
            fare: '',
        };
        chai
            .request(app)
            .post('/api/v1/trips')
            .send(trip)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR GET ALL TRIPS
    it('GET/api/v1/trips Should fetch all trips', (done) => {
        chai
            .request(app)
            .get('/api/v1/trips')
            .set('authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });

    //GET A SPECIFIC TRIP TEST
    it('GET/api/v1/trips/:trip-id Should fetch a specific trip', (done) => {
        const trip = {
            id: Trip.getAllTrips().length + 1,
            seating_capacity: '67',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: 'Kigali',
            trip_date: '23/09/2019',
            fare: '4000',
            status: '1',
        };
        const tripId = Trip.createNewTrip(trip).id;
        chai
            .request(app)
            .get(`/api/v1/trips/${tripId}`)
            .set('authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });

    //SHOULD NOT ALLOW AN ID THAT IS NOT AN INTEGER
    it('GET/api/v1/trips/:trip-id Should not allow non-integer id', (done) => {
        const trip = {
            id: '1asdfgvhbjn',
            seating_capacity: '67',
            bus_license_number: 'KZE 432',
            origin: 'Nairobi',
            destination: 'Kigali',
            trip_date: '23/08/2019',
            fare: '4000',
            status: '1',
        };
        const tripId = Trip.createNewTrip(trip).id;
        chai
            .request(app)
            .get(`/api/v1/trips/${tripId}`)
            .set('authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });

    // CANCEL A TRIP TEST
    it('PATCH/api/v1/trips/:trip-id/cancel Should cancel all trips', (done) => {
        chai
            .request(app)
            .patch(`/api/v1/trips/1/cancel`)
            .set('authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });
});