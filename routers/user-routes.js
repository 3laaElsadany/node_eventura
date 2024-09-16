const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require('passport');
const {
  isAuthenticated
} = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb('Only images are allowed!', false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter
})


router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
  let newFields = {
    avatar: req.file.filename
  }
  User.updateOne({
      _id: req.user.id
    }, newFields)
    .then(() => {
      res.redirect('/users/profile')
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/login', (req, res) => {
  res.render('user/login', {
    error: req.flash('error')
  })
})

router.post('/login', passport.authenticate('local.login', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/signup', (req, res) => {
  res.render('user/signup', {
    error: req.flash('error')
  })
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/users/profile',
  failureRedirect: '/users/signup',
  failureFlash: true
}))

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('user/profile', {
    success: req.flash('success')
  })
})

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/users/login');
  });
})

module.exports = router;