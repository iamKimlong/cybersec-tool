const db = require("../config/database");

class User {
  static async create(username, password) {
       const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
         const user = await this.getById(result.insertId);
         return user;
    }

    static async getByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async getById(id) {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = User;