const {
  check
} = require('express-validator');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/users/login');
};

const valid = [
  check('title').isLength({
    min: 5
  }).withMessage('Title must be more than 5 chars'),
  check('description').isLength({
    min: 5
  }).withMessage('Description must be more than 5 chars'),
  check('location').isLength({
    min: 3
  }).withMessage('Location must be more than 3 chars'),
  check('date').isLength({
    min: 5
  }).withMessage('Date must be more than 5 chars')
]

module.exports = {
  isAuthenticated,
  valid
}