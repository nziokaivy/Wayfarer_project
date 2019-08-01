import express from 'express';
import SignUp from '../controllers/signUpController';

const router = express.Router();

//authentication routes
router.post('/auth/signup', SignUp.signup);


export default router;