import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import Token from '../api/helpers/authToken';

chai.should();
chai.use(chaiHttp);

const adminToken = Token.genToken(1, true, 'admin@test.com', 'admin', 'test');
const userToken = Token.genToken(2, false, 'janedoe@gmail.com', 'user', 'test');

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
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR CANNOT BOOK A SEAT WITH INVALID SEAT NUMBER
	it('POST/api/v1/bookings Should not book a seat with an invalid trip id', (done) => {
		const bookings = {
			trip_id: '1',
			first_name: 'John',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: 'yffff',
		};
		chai
			.request(app)
			.post('/api/v1/bookings')
			.send(bookings)
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR CANNOT BOOK A SEAT IN A NON EXISTENT TRIP
	it('POST/api/v1/bookings Should not book a seat in a trip that is non-existent', (done) => {
		const bookings = {
			trip_id: '1000',
			first_name: '',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: '23',
		};
		chai
			.request(app)
			.post('/api/v1/bookings')
			.send(bookings)
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR CANNOT BOOK A SEAT WITH INVALID TRIP ID
	it('POST/api/v1/bookings Should not book a seat with an invalid trip id', (done) => {
		const bookings = {
			trip_id: 'asdf',
			first_name: 'John',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: '23',
		};
		chai
			.request(app)
			.post('/api/v1/bookings')
			.send(bookings)
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
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
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR BOOK A SEAT
	it('POST/api/v1/bookings Should book a seat', (done) => {
		const bookings = {
			user_id: '2',
			trip_id: '1',
			first_name: 'Jane',
			last_name: 'Doe',
			email: 'janedoe@gmail.com',
			seat_number: '23',
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


	// TEST FOR GETTING ALL BOOKINGS
	it('GET/api/v1/bookings Should fetch all bookings admin', (done) => {
		chai
			.request(app)
			.get('/api/v1/bookings')
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.should.be.a('object');
				done();
			});
	});


	// TEST FOR GETTING ALL BOOKINGS A SPECIFIC BOOKING
	it('GET/api/v1/bookings Should show all user bookings', (done) => {
		chai
			.request(app)
			.get('/api/v1/userbookings')
			.set('authorization', `Bearer ${userToken}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR CANNOT BOOK A SEAT WITH INVALID SEAT NUMBER
	it('POST/api/v1/bookings Should not book a seat with an invalid trip id', (done) => {
		const bookings = {
			trip_id: '1',
			first_name: 'John',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: 'yffff',
		};
		chai
			.request(app)
			.post('/api/v1/bookings')
			.send(bookings)
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR CANNOT BOOK A SEAT IN A NON EXISTENT TRIP
	it('POST/api/v1/bookings Should not book a seat in a trip that is non-existent', (done) => {
		const bookings = {
			trip_id: '1000',
			first_name: '',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: '23',
		};
		chai
			.request(app)
			.post('/api/v1/bookings')
			.send(bookings)
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});

	// TEST FOR CANNOT BOOK A SEAT WITH INVALID TRIP ID
	it('POST/api/v1/bookings Should not book a seat with an invalid trip id', (done) => {
		const bookings = {
			trip_id: 'asdf',
			first_name: 'John',
			last_name: 'Doe',
			email: 'johndoe@gmail.com',
			seat_number: '23',
		};
		chai
			.request(app)
			.post('/api/v1/bookings')
			.send(bookings)
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
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
			.set('authorization', `Bearer ${adminToken}`)
			.end((err, res) => {
				res.should.have.status(400);
				res.should.should.be.a('object');
				done();
			});
	});
});
