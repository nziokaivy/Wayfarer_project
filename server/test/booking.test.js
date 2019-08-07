import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Booking from '../api/db/booking';
import Token from '../api/helpers/authToken';

const should = chai.should();
chai.use(chaiHttp);

const adminToken = Token.genToken(1, true, 'admin@test.com', 'admin', 'test');
const userToken = Token.genToken(2, false, 'user@test.com', 'user', 'test');

describe('Book Seat', () => {
    // TEST FOR BOOKING A SEAT
    it('POST/api/v1/bookings Should book a seat', (done) => {
        const bookings = {
            trip_id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            seat_number: 23,
        };
        chai
            .request(app)
            .post('/api/v1/bookings')
            .send(bookings)
            .set('authorization', `Bearer ${adminToken}`)
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
            .set('authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });


    it('DELETE /api/v1/booking/:id Should delete a specific booking', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/booking/${2}`)
            .set('authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(204);
                res.body.should.be.a('object');
                done();
            });
    });

    // TEST FOR DELETE A BOOKING
    it('DELETE /api/v1/booking/:id Should not delete a non-existent booking id', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/booking/${23}`)
            .set('authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

});