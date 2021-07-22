const db = require('../../config/dbConfig');

const findOneByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return result[0][0];
};

const findOneById = async (id) => {
  const result = db.query('SELECT * FROM users WHERE id = ?', [id]);
  return result[0][0];
};

const createOneUser = async (email, password, fullName) => {
  const [insertedUser] = await db.query(
    'INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)',
    [email, password, fullName]
  );
  return {
    id: insertedUser.insertId,
    email,
    password,
    fullName,
  };
};

module.exports = {
  findOneByEmail,
  findOneById,
  createOneUser,
};
