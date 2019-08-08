import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Booking from '../api/db/booking';
import Token from '../api/helpers/authToken';

const should = chai.should();
chai.use(chaiHttp);

const adminToken = Token.genToken(1, true, 'admin@test.com', 'admin', 'test');
const userToken = Token.genToken(2, false, 'janedoe@gmail.com', 'user', 'test');
console.log(adminToken);

describe('Book Seat', () => {
    // TEST FOR CANNOT BOOK A SEAT WITHOUT TRIP ID
    it('POST/api/v1/bookings Should not book a seat without trip id', (done) => {
        const bookings = {
            trip_id: '',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            seat_number: '23',
        };
        chai
            .request(app)
            .post('/api/v1/bookings')
            .send(bookings)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object')
                done();
            });
    });

    // TEST FOR CANNOT BOOK WITHOUT SEAT NUMBER
    it('POST/api/v1/bookings Should not book a seat without seat number', (done) => {
        const bookings = {
            trip_id: '1',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            seat_number: '',
        };
        chai
            .request(app)
            .post('/api/v1/bookings')
            .send(bookings)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object')
                done();
            });
    });

    //TEST FOR BOOK A SEAT
    it('POST/api/v1/bookings Should book a seat', (done) => {
        const bookings = {
            trip_id: '1',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@gmail.com',
            seat_number: '23',
        };
        chai
            .request(app)
            .post('/api/v1/bookings')
            .send(bookings)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.should.be.a('object')
                done();
            });
    });

    //TEST FOR GETTING ALL BOOKINGS
    it('GET/api/v1/bookings Should fetch all bookings admin', (done) => {
        chai
            .request(app)
            .get('/api/v1/bookings')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR GETTING ALL BOOKINGS A SPECIFIC BOOKING
    it('GET/api/v1/bookings Should show all user bookings', (done) => {
        chai
            .request(app)
            .get('/api/v1/userbookings')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });

     //TEST FOR GETTING ALL BOOKING THAT DOESN'T EXIST
     it('GET/api/v1/bookings Should fetch all bookings', (done) => {
        chai
            .request(app)
            .get('/api/v1/userbookings/1000')
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR DELETE A BOOKING
    it('DELETE /api/v1/booking/:id Should delete a specific booking', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/booking/${2}`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });

    // TEST FOR DELETE A BOOKING
    it('DELETE /api/v1/booking/:id Should not delete a non-existent booking id', (done) => {
        chai
            .request(app)
            .delete(`/api/v1/booking/23`)
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
            });
    });

});