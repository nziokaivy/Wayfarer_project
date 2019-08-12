import express from 'express';
import Users from '../controllers/userController';
import Trip from '../controllers/tripController';
import Booking from '../controllers/bookingController';
import Auth from '../middleware/auth';
import allValidations from '../middleware/validations';

const router = express.Router();
  
//authentication routes
router.post('/auth/signup', allValidations.signup, allValidations.validateEmail, Users.signup);
router.post('/auth/signin', allValidations.signin, Users.signin);

//trip routes
router.post('/trips', Auth.checkAdmin, allValidations.validateTrip, Trip.createNewTrip);
router.get('/trips', Trip.getAllTrips);
router.get('/trips/:id',  allValidations.validateId, Trip.getSpecificTrip);
router.patch('/trips/:id/cancel', Auth.checkAdmin, allValidations.validateId, Trip.cancelTrip);

//booking routes
router.post('/bookings', Auth.checkUser, allValidations.validateBooking, Booking.booking);
router.get('/bookings', Auth.checkAdmin, Booking.getAllBookings);
router.get('/userbookings', Auth.checkUser, Booking.bookingsByUserOnly);
router.delete('/booking/:id', Auth.checkUser, allValidations.validateId, Booking.deleteBooking);

export default router;
