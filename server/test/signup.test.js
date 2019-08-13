import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import User from '../api/models/user';

chai.should();
chai.use(chaiHttp);

describe('Sign up', () => {
	it('POST/api/v1/auth/signup Should create a new user account', (done) => {
		const user = {
			id: User.getAllUsers().length + 1,
			email: 'johndodee@gmail.com',
			first_name: 'John',
			last_name: 'Doe',
			password: 'PAass@123gh',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signup')
			.send(user)
			.end((err, res) => {
				res.should.have.status(201);
				res.should.should.be.a('object');
				done();
			});
	});
});
