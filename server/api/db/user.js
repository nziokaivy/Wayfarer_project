class User {
<<<<<<< HEAD
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

    createNewUser({first_name,last_name,email,password}) {
      const newUser = {
        id: this.users.length + 1,
        first_name: first_name,
        last_name:last_name,
        email: email,
        password: password,
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
  
=======
	constructor() {
		this.users = [{
			id: 1,
			email: 'maryjane@gmail.com',
			first_name: 'Mary',
			last_name: 'Jane',
			password: 'pass@1234',
			is_admin: true,
		},
		{
			id: 2,
			email: 'janeode@gmail.com',
			first_name: 'Jane',
			last_name: 'Doe',
			password: 'pass@12345',
			is_admin: false,
		},
		];
	}

	createNewUser(data) {
		const newUser = {
			id: this.users.length + 1,
			email: data.email,
			first_name: data.first_name,
			last_name: data.last_name,
			password: data.password,
			is_admin: data.is_admin || false,
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
}
export default new User();
>>>>>>> ft-user-filter-by-origin-UI-167826408
