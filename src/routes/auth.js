const auth = require('express').Router();
const authController = require('../controllers/authController');
const configController = require('../controllers/configController');
const homeController = require('../controllers/homeController');


auth.get('/', authController.index);
auth.get('/logout', authController.logout)

auth.get('/signup',authController.signup);
auth.post('/signup',authController.createUser);
auth.get('/home',configController.isValidUser,authController.home);


auth.get('/menu',configController.isValidUser,homeController.menu);
auth.get('/ubicacion',configController.isValidUser,homeController.ubicacion);


module.exports = auth;