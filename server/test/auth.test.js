import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';
import User from '../api/db/user';

const should = chai.should();
chai.use(chaiHttp);

describe('Sign up', () => {
    it('POST/api/v1/auth/signup Should create a new user account', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'pass@123',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.should.be.a('object');
                done();
            });
    });

    it('POST/api/v1/auth/signin Should login an existing user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'janedoe@gmail.com',
                password: 'pass@12345',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });
});