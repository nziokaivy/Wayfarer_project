import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Auth {
	static checkAdmin(req, res, next) {
		try {
			const tokenData = req.headers.authorization;
			if (!tokenData || tokenData === null || tokenData === '') {
				return res.status(401).json({
					status: 401,
					message: 'Token required',
				});
			}
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
		} catch (error) {
			return res.status(403).json({
				status: 403,
				error: 'Invalid Token',
			});
		}
	}

	static checkUser(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			// eslint-disable-next-line no-unused-vars
			const decodedToken = jwt.verify(token, process.env.JWT_KEY, (err, _decodedToken) => {
				if (err) {
					return res.status(403).json({
						status: 403,
						error: 'Invalid Token',
					});
				}
			});
			next();
		} catch (error) {
			return res.status(403).json({
				status: 403,
				error: 'Invalid Token',
			});
		}
	}
}
export default Auth;
