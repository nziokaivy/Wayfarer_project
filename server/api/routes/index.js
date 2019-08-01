import express from 'express';
import SignUp from '../controllers/signUpController';
import SignIn from '../controllers/signInController';
import Trip from '../controllers/tripController';

const router = express.Router();

//authentication routes
router.post('/auth/signup', SignUp.signup);
router.post('/auth/signin', SignIn.signin);

//trip routes
router.post('/trips', Trip.createNewTrip);

export default router;