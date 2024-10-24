const connection = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, password, role = 'user') => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        connection.query(query, [username, hashedPassword, role], (err, results) => {
            if (err) return reject(err);
            resolve(results.insertId);
        });
    });
};

const findUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        connection.query(query, [username], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

module.exports = {
    createUser,
    findUserByUsername,
    findUserById,
};
