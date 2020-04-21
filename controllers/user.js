const User = require('../models/user');
const { validationResult } = require('express-validator');

// GET-methods
exports.getHomePage = (req, res, next) => {
  const { userEmail, userRealName } = req.session;

  if (!userEmail || !userRealName)
    return res.render('sign-in-and-sign-up');
  return res.render('user', { email: userEmail, realName: userRealName })
}

exports.redirectToHomePage = (req, res, next) => {
  res.redirect('/');
}


// POST-methods
exports.postRegistration = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(422).render('sign-in-and-sign-up', {
      error: errors.array()
    });
  }
  
  const { email, realName, birthDate, password } = req.body;
  const userExist = await User.findOne({ where: { email } });
  if (userExist) return res.render('sign-in-and-sign-up', {
    error: 'User with current login already exists'
  });

  const user = await User.create({ email, realName, birthDate, password });

  req.session.userEmail = user.email;
  req.session.userRealName = user.realName;

  return res.redirect('/');
};

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(422).render('sign-in-and-sign-up', {
      error: errors.array()
    });
  }

  const { email, password } = req.body;

  const userExist = await User.findOne({ where: { email, password } });
  if (!userExist) return res.render('sign-in-and-sign-up', {
    error: 'Uncorrect login or password'
  });

  req.session.userEmail = userExist.email;
  req.session.userRealName = userExist.realName;

  return res.redirect('/');
};

exports.postLogout = (req, res, next) => {
  res.clearCookie('connect.sid')
  return res.redirect('/');
};