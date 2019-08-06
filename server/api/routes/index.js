import express from 'express';
import passport from 'passport';
import passportConf from '../passport';
import SignUp from '../controllers/signUpController';
import SignIn from '../controllers/signInController';
import Trip from '../controllers/tripController';
import Booking from '../controllers/bookingController';


const router = express.Router();

const passportJWT = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ status: 'error', error: 'Missing or Invalid Token!' });
      req.user = user;
      next();
    })(req, res, next);
  };
  

//authentication routes
router.post('/auth/signup', SignUp.signup);
router.post('/auth/signin', SignIn.signin);

//trip routes
router.post('/trips', passportJWT, Trip.createNewTrip);
router.get('/trips', passportJWT, Trip.getAllTrips);
router.get('/trips/:id', passportJWT, Trip.getSpecificTrip);
router.patch('/trips/:id/cancel', passportJWT, Trip.cancelTrip);

//booking routes
router.post('/bookings', passportJWT, Booking.booking);
router.get('/bookings', passportJWT ,Booking.getAllBookings);
router.delete('/booking/:id', passportJWT, Booking.deleteBooking);

export default router;