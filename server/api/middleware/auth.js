import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Booking from '../db/booking';
dotenv.config();

class Auth {

    static checkAdmin(req, res, next) {
        try {
            const tokenData = req.headers.authorization;
            if (!tokenData || tokenData === null || tokenData === '') {
                return res.status(401).json({
                    status: 401,
                    message: 'Token required'
                });
            } else {
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                if (decodedToken.is_admin === true) {
                    next();
                } else {
                    return res.status(403).json({
                        status: 403,
                        error: 'Access Not Allowed!',
                    });
                }
            }
        } catch (error) {
            return error.toString();
        }
    }

    static checkUser(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            console.log(token, 'auth');
            if (!token || token === null || token === '') {
                return res.status(401).json({
                    status: 401,
                    error: 'Token required'
                });
            } else {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                next();
            }
        } catch (error) {
            return error.toString()
        }
    }
}
export default Auth;