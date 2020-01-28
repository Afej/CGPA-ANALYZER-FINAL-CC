const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // get token from header
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    // vheck if not token
    return res.status(401).json({ msg: 'no token, auth denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
