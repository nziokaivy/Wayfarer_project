import JWT from 'jsonwebtoken';
import secret from '../config/config';


const authToken = (user) => {
    return JWT.sign({
        iss: 'Wayfarer',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
    }, secret);
};

module.exports = {authToken};
  