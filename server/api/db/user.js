class User {
	constructor() {
		this.users = [
			{
				id: 1,
				email: 'admin@gmail.com',
				first_name: 'admin',
				last_name: 'admin',
				password: 'Pass@123y',
				is_admin: true,
			},
			{
				id: 2,
				email: 'janedoe@gmail.com',
				first_name: 'Jane',
				last_name: 'Doe',
				password: 'Ivyme@123',
				is_admin: false,
			},
		];
	}

	createNewUser({
		// eslint-disable-next-line camelcase
		first_name, last_name, email, password,
	}) {
		const newUser = {
			id: this.users.length + 1,
			first_name,
			last_name,
			email,
			password,
			is_admin: false,
		};
		this.users.push(newUser);
		return newUser;
	}

	getUser(id) {
		return this.users.find(user => user.id === id);
	}

	getAllUsers() {
		return this.users;
	}

	verifyEmail(email) {
		const confirmEmail = this.users.find(user => user.email === email);
		if (!confirmEmail) {
			return false;
		}
		this.result = email;
		return true;
	}
}
export default new User();
