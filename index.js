const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');

const port = 3000;
const SECRET = '1_9eJNA231NLN!@(J!@m';

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

const userControllers = require('./controllers/user');
const errorControllers = require('./controllers/error');

const { check } = require('express-validator');

const validateRegistrationData = [
  check('email').isEmail().withMessage('Email must be correct'),
  check('realName').isLength({ min: 3 }).withMessage('Name must have at least 4 characters'),
  check('password').isLength({ min: 3 }).withMessage('Password must have at least 4 characters'),
  check('birthDate').isString()
];
const validateLoginData = [
  check('email').isEmail().withMessage('Email must be correct'),
  check('password').isLength({ min: 3 }).withMessage('Password must have at least 4 characters')
];

app.get('/', userControllers.getHomePage);
app.get('/regisration', userControllers.redirectToHomePage);
app.get('/login', userControllers.redirectToHomePage);
app.get('/logout', userControllers.redirectToHomePage);

app.post('/registration', validateRegistrationData, userControllers.postRegistration);
app.post('/login', validateLoginData, userControllers.postLogin);
app.post('/logout', userControllers.postLogout);

app.use(errorControllers.get404);

app.listen(port, () => console.log(`Listenong on port: ${port}`));