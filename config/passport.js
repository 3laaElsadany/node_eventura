const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use('local.login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const user = await User.findOne({
      email: username
    });

    if (!user) {
      return done(null, false, req.flash('error', 'Email not found'));
    }

    const isMatch = await bcrypt.compareSync(password, user.password);

    if (isMatch) {
      return done(null, user, req.flash('success', 'Welcome Back'));
    } else {
      return done(null, false, req.flash('error', 'incorrect password'));
    }
  } catch (err) {
    return done(null, false, req.flash('error', err));
  }

}))

passport.use('local.signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  if (req.body.password != req.body.confirm_password) {
    return done(null, false, req.flash('error', 'Passwords do not match'))
  }
  User.findOne({
      email: username
    })
    .then(user => {
      if (user) {
        return done(null, false, req.flash('error', 'Email already exist'))
      }
      if (!user) {
        const newUser = new User()
        newUser.email = req.body.email;
        newUser.password = newUser.hashPasswords(req.body.password);
        newUser.avatar = 'profile.png'
        newUser.save()
          .then(user => {
            return done(null, user, req.flash('success', 'User created successfuly'))
          })
          .catch(err => {
            return done(err)
          })
      }
    })
    .catch(err => {
      return done(err)
    })
}))