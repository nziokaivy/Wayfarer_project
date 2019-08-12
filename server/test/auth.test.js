import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/server';

const should = chai.should();
chai.use(chaiHttp);



// TEST FOR CREATING A NEW USER ACCOUNT

describe('Sign up', () => {
    it('POST/api/v1/auth/signup Should create a new user account', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'Ivyme@123',
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR SIGNING UP WITH AN ALREADY EXISTING EMAIL
    it('POST/api/v1/auth/signup Should not create a new user account if email is already taken', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: 'Ivyme@123',
            })
            .end((err, res) => {
                res.should.have.status(409);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR CANNOT CREATE A NEW USER IF FIRST NAME IS MISSING
        it('POST/api/v1/auth/signup Should not create a new user account if first name is missing', (done) => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send({
                    first_name: '',
                    last_name: 'Doe',
                    email: 'johndoe@gmail.com',
                    password: 'Ivyme@123',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.should.be.a('object');
                    done();
                });
        });

    //TEST FOR CANNOT CREATE A NEW USER IF LAST NAME IS MISSING
        it('POST/api/v1/auth/signup Should not create a new user account if last name is missing', (done) => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send({
                    first_name: 'John',
                    last_name: '',
                    email: 'johndoe@gmail.com',
                    password: 'Ivyme@123',
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.should.should.be.a('object');
                    done();
                });
        });

    //TEST FOR CANNOT CREATE A NEW USER IF EMAIL IS MISSING
    it('POST/api/v1/auth/signup Should not create a new user account if email is missing', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: '',
                password: 'Ivyme@123',
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

     //TEST FOR CANNOT CREATE A NEW USER IF PASSWORD IS MISSING
     it('POST/api/v1/auth/signup Should not create a new user account if password is missing', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@gmail.com',
                password: '',
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });
    
    //TEST FOR LOGING IN A USER
    it('POST/api/v1/auth/signin Should login an existing user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'janedoe@gmail.com',
                password: 'Ivyme@123',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR USER CANNOT LOG IN IF EMAIL IS MISSING
    it('POST/api/v1/auth/signin Should not log if a user if email is missing', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: '',
                password: 'Ivyme@123',
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR USER CANNOT LOG IN IF EMAIL IS INVALID
    it('POST/api/v1/auth/signin Should not log if a user if email is invalid', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'meme@gmail.com',
                password: 'Ivyme@123',
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.should.should.be.a('object');
                done();
            });
    });

    //TEST FOR USER CANNOT LOG IN IF PASSWORD IS MISSING
    it('POST/api/v1/auth/signin Should not log if a user if password is missing', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'janedoe@gmail.com',
                password: '',
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.should.should.be.a('object');
                done();
            });
    });
    
    //TEST FOR CHECKING IF PASSWORD IS INVALID
    it('POST/api/v1/auth/signin Should not log if a user if password is invalid', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'janedoe@gmail.com',
                password: 'frrfvgrevrevr',
            })
            .end((err, res) => {
                res.should.have.status(404);
                res.should.should.be.a('object');
                done();
            });
    });
});