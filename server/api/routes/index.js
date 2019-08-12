import express from 'express';
import SignUp from '../controllers/signUpController';
import SignIn from '../controllers/signInController';
import Trip from '../controllers/tripController';
import Booking from '../controllers/bookingController';

const router = express.Router();

// authentication routes
router.post('/auth/signup', SignUp.signup);
router.post('/auth/signin', SignIn.signin);

// trip routes
router.post('/trips', Trip.createNewTrip);
router.get('/trips', Trip.getAllTrips);
router.get('/trips/:id', Trip.getSpecificTrip);
router.patch('/trips/:id/cancel', Trip.cancelTrip);

// booking routes
router.post('/bookings', Booking.booking);
router.get('/bookings', Booking.getAllBookings);
router.delete('/booking/:id', Booking.deleteBooking);

export default router;
