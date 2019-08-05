import passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import User from './db/user';
import { secret } from './config/config';

const JwtStrategy = require('passport-jwt').Strategy;

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('auth'),
  secretOrKey: secret,

}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.getUser(payload.sub);
    // If user doesn't exist handle it
    if (!user) {
      return done(null, false);
    }
    // Otherwise return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));