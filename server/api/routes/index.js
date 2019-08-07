import express from 'express';
import Users from '../controllers/userController';
import Trip from '../controllers/tripController';
import Booking from '../controllers/bookingController';
import Auth from '../middleware/auth';
import allValidations from '../middleware/validations';

const router = express.Router();
  
//authentication routes
router.post('/auth/signup', allValidations.signup, allValidations.validateEmail, Users.signup);
router.post('/auth/signin', Users.signin);

//trip routes
router.post('/trips', Auth.checkAdmin, Trip.createNewTrip);
router.get('/trips', Auth.checkUser, Trip.getAllTrips);
router.get('/trips/:id',  Auth.checkUser, Trip.getSpecificTrip);
router.patch('/trips/:id/cancel', Auth.checkAdmin, Trip.cancelTrip);

//booking routes
router.post('/bookings', Auth.checkUser, Booking.booking);
router.get('/bookings', Auth.checkUser, Booking.getAllBookings);
router.delete('/booking/:id', Auth.checkUser, Booking.deleteBooking);

export default router;