import User from '../db/user';
import createToken from '../helpers/authToken';

class Users{
    static signup(req, res) {
        const { first_name, last_name, email ,password } = req.body;
        const newUser = User.createNewUser({first_name,last_name,email,password});
        const token = createToken.genToken(newUser.id, newUser.is_admin,newUser.email,newUser.first_name,newUser.last_name);
        newUser.token = token;
        return res.status(201).json({ status: 'success', data: newUser});
    }

    static signin(req, res) {
        const { email ,password } = req.body;
        const getUser = User.getAllUsers().find(user => user.email === email && user.password === password);
        if(!getUser) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }
        const getPassword = getUser.password === password;
        if (!getPassword) {
            return res.status(401).json({ status: 'error', error: 'Incorrect password' });
        }
        const token = createToken.genToken( getUser.id,  getUser.is_admin, getUser.email, getUser.first_name, getUser.last_name);
        getUser.token = token;
        return res.status(200).json({ status: 'success', data: getUser });
    }
};

export default Users;
