// eslint-disable-next-line import/no-unresolved
import bcrypt from 'bcryptjs';

class HashedPassword {
	static hashPassword(password) {
		// eslint-disable-next-line no-undef
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	}

	static comparePassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword);
	}
}
export default HashedPassword;
