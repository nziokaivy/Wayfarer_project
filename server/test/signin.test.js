import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';

chai.should();
chai.use(chaiHttp);


describe('Sign in', () => {
	it('POST/api/v1/auth/signin Should login an existing user', (done) => {
		const user = {
			email: 'janedoe@gmail.com',
			password: 'Ivyme@123',
		};
		chai
			.request(app)
			.post('/api/v1/auth/signin')
			.send(user)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.should.be.a('object');
				done();
			});
	});
});
