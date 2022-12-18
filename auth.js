const jwtSecret = 'your_jwt_secret';
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport.js');

/**
 * Create a JWT bearer token
 * @function generateJWTToken
 * @param {object} user 
 * @returns user object, bearer token
*/
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

/**
 * POST user login and create token
 * @name userLogin
 * @kind function
 * @requires passport
 * @param router 
 * @returns user object, bearer token
*/
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, {session: false}, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({user, token});
      });
    })(req, res);
  });
}