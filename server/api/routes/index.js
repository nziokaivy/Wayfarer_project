import express from 'express';
import UserController from '../controllers/userController';
import TripController from '../controllers/tripController';
import BookingController from '../controllers/bookingController';
import Auth from '../middleware/auth';
import allValidations from '../middleware/validations';


const router = express.Router();
  
//authentication routes
router.post('/auth/signup', allValidations.signup, allValidations.validateEmail, UserController.signup);
router.post('/auth/signin', allValidations.signin, UserController.signin);

//trip routes
router.post('/trips', Auth.checkAdmin, allValidations.validateTrip, TripController.createNewTrip);
router.get('/trips', TripController.getAllTrips);
router.get('/trips/:id',  allValidations.validateId, TripController.getSpecificTrip);
router.patch('/trips/:id/cancel', Auth.checkAdmin, allValidations.validateId, TripController.cancelTrip);
router.get('/trip/:origin', allValidations.validateOrigin, TripController.getAllTripsByOrigin);

//booking routes
router.post('/bookings', Auth.checkUser, allValidations.validateBooking, BookingController.booking);
router.get('/bookings', Auth.checkAdmin, BookingController.getAllBookings);
router.get('/userbookings', Auth.checkUser, BookingController.bookingsByUserOnly);
router.delete('/booking/:id', Auth.checkUser, allValidations.validateId, BookingController.deleteBooking);

export default router;