import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import User from './db/user';
import { secret } from './config/config';

const JwtStrategy = require('passport-jwt').Strategy;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('auth'),
  secretOrKey: secret,

}, async (payload, done) => {
  try {
    const user = await User.getUser(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));