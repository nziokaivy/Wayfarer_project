import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {

    static checkAdmin(req, res, next) {
        const tokenData = req.headers.authorization;        
        if (!tokenData || tokenData === null || tokenData === '') {
            return res.status(401).json({
                status: 'error',
                error: 'Token required'
            });
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_KEY);
            if (decodedToken.is_admin === true) {
                next();
            } else {
                return res.status(403).json({
                    message: 'Access Not Allowed!',
                });
            }
        }
    }

    static checkUser(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token || token === null || token === '') {
                return res.status(401).json({
                    status: 'error',
                    error: 'Token required'
                });
            } else {
                const decodedToken = jwt.verify(token, process.env.JWT_KEY);
                next();
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default Auth;