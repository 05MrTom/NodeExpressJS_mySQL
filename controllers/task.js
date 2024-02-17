// controllers/SQL_task.js
const pool = require('../db/connect.js'); // Import the pool
const uuid = require('uuid');

const registerUser = async (req, res) => {
  try {
    const { name, role, paid, email, organisation, password } = req.body;
    const userId = uuid.v4();
    const createdAt = new Date();
    const [result] = await pool.execute(
      'INSERT INTO register (uuid, name, role, paid, email, organisation, password, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, name, role, paid, email, organisation, password, createdAt]
    );

    res.status(201).json({
      uuid: userId,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const getAllUser = async (req, res) => {
    try {
        const [rows, fields] = await pool.execute('SELECT * FROM register');
        res.status(200).json({ users: rows });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const [rows, fields] = await pool.execute('SELECT * FROM register WHERE uuid = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: `No user with id: ${userId}` });
        }
        const user = rows[0];
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const removeUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const [result] = await pool.execute('DELETE FROM register WHERE uuid = ?', [userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: `No user with id: ${userId}` });
        }
        res.status(200).json({ msg: 'User removed successfully' });
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows, fields] = await pool.execute('SELECT * FROM register WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }
        const user = rows[0];
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const userData = req.body;
        // Generate SET clause dynamically based on provided fields in req.body
        const setClause = Object.keys(userData).map(key => `${key} = ?`).join(', ');
        // Assuming you have a 'users' table in your SQL database
        const [result] = await pool.execute(
            `UPDATE register SET ${setClause} WHERE uuid = ?`,
            [...Object.values(userData), userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: `No user with id: ${userId}` });
        }
        res.status(200).json({ id: userId, data: userData });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

module.exports = {registerUser, getAllUser, getUser, removeUser, loginUser, updateUser};
