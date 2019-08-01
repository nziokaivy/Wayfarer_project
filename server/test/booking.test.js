import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Booking from '../api/db/booking';

const should = chai.should();
chai.use(chaiHttp);

describe('Book Seat', () => {
    // TEST FOR BOOKING A SEAT
    it('POST/api/v1/bookings Should book a seat', (done) => {
        const bookings = {
            id: Booking.getAllBookings().length + 1,
            trip_id: 1,
            user_id: 1,
            seat_number: 23,
            created_on: '23-07-2019',

        };
        chai
        .request(app)
        .post('/api/v1/bookings')
        .send(bookings)
        .end((err, res) => {
            res.should.have.status(201);
            res.should.should.be.a('object');
            done();
        });
    });
    //TEST FOR GETTING ALL BOOKINGS
    it('GET/api/v1/bookings Should fetch all bookings', (done) => {
        chai
        .request(app)
        .get('/api/v1/bookings')
        .end((err, res) => {
        res.should.have.status(200);
        res.should.should.be.a('object');
        done();
        });
    });
});