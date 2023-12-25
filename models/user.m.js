const db = require('../utils/db');

class Users {
    static async getAllUser() {
        try {
            const query = 'SELECT * FROM "Users"';;
            const users = await db.any(query);
            return users;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
    static async getUser(userInfo) {
        try {
            const { username, password } = userInfo;

            const query = 'SELECT * FROM "Users" WHERE "Username" = $1 AND "Password" = $2';
            const user = await db.oneOrNone(query, [username, password]);

            return user;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
    static async addUser(userData) {
        try {
            const users = await this.getAllUser();
            const id = users.length;
            const { username, password, fullname, email, dob, permission } = userData;
            var per = 0;
            if (permission === true){
                per = 1;
            }

            const query = 'INSERT INTO "Users" ("ID", "Username", "Password", "Name", "Email", "DOB", "Permission") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            await db.one(query, [id, username, password, fullname, email, dob, per]);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}

module.exports = {
    Users
};