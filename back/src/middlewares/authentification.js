const jsonwebtoken = require('jsonwebtoken');
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const checkAuthentification = async (req, res, next) => {
  const bearer = req.get('authorization');
  const token = bearer.replace('Bearer ', '');
  if (typeof token !== 'undefined') {
    try {
      const { user } = await jsonwebtoken.verify(token, JWT_PRIVATE_KEY);
      req.user = user;
      console.log(req);
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid user' });
    }
  }
  return res.status(401).json({ message: 'Invalid user' });
};

module.exports = {
  checkAuthentification,
};
