const {Users} = require('../models/user.m');

class UserController{
    static async signup(req, res) {
        try {
            await Users.addUser(req.body);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    static async login(req, res) {
        try {
            const user = await Users.getUser(req.body);
            return user;
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = {
    UserController
};
