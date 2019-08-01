class User {
    constructor() {
      this.users = [
        {
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

  
  
  
  
  
  
  
  

  
  
  