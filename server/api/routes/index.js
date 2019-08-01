import express from 'express';
import SignUp from '../controllers/signUpController';
import SignIn from '../controllers/signInController';

const router = express.Router();

//authentication routes
router.post('/auth/signup', SignUp.signup);
router.post('/auth/signin', SignIn.signin);


export default router;