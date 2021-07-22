const { findOneByEmail, createOneUser } = require('./user.model');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email or Password is missing.');
    }
    const user = await findOneByEmail(email);
    if (user === null) {
      return res.status(404).send('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).send('Incorrect password');
    }

    const token = jsonwebtoken.sign(
      {
        user: { id: user.id, email: user.email },
      },
      JWT_PRIVATE_KEY,
      {
        expiresIn: '2d',
      }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
};

const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      return res.status(400).send('Bad request. Some fields are missing.');
    }

    const userAlreadyExists = await findOneByEmail(email);
    if (userAlreadyExists) {
      return res.status(401).send('Unauthorized. User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createOneUser(email, hashedPassword, fullName);

    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
};

module.exports = {
  login,
  register,
};
