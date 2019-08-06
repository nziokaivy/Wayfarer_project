import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Booking from '../api/db/booking';
import user from '../api/db/user';

const should = chai.should();
chai.use(chaiHttp);

describe('Bookings Tests', () => {
    let token = '';
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send({
           email: 'maryjane@gmail.com',
           password: 'pass@1234',
        })
        .end((err, res) => {
            console.log(err)
          const result = JSON.parse(res.text);
          token = result.data.token;
          done();
        });
    }); 
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
        .set('auth',token)
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
        .set('auth',token)
        .end((err, res) => {
        res.should.have.status(200);
        res.should.should.be.a('object');
        done();
        });
    });

    // TEST FOR DELETE A BOOKING
    it('DELETE /api/v1/booking/:id Should delete a specific booking', (done) => {
        const booking = {
          id: Booking.getAllBookings().length + 1,
          trip_id: 4,
          user_id: 6,
          seat_number: 33,
          create_on: '23-07-2019',
        };
        const bookingId = Booking.createNewBooking(booking).id;
        chai
          .request(app)
          .delete(`/api/v1/booking/${bookingId}`)
          .set('auth',token)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
          });
      });
});
});