import JWT from 'jsonwebtoken';
import { secret } from '../config/config';

const createToken = (user) => {
  return JWT.sign({
    iss: 'wayFarer',
    sub: user.id,
    sub: user.is_admin,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() +1),
  }, secret);
};
module.exports = {
  createToken,
};