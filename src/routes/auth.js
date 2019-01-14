const auth = require('express').Router();
const authController = require('../controllers/authController');
const configController = require('../controllers/configController');
const homeController = require('../controllers/homeController');
const comentariosController = require('../controllers/comentariosController');
const ubicacionController = require('../controllers/ubicacionController');

auth.get('/', authController.index);
auth.get('/logout', authController.logout)

auth.get('/signup',authController.signup);
auth.get('/reset',authController.reset);
auth.post('/signup',authController.createUser);
auth.get('/home',configController.isValidUser,authController.home);


auth.get('/menu',configController.isValidUser,homeController.menu);
//auth.get('/ubicacion',configController.isValidUser,homeController.ubicacion);
auth.get('/ubicacion',homeController.ubicacion);


auth.get('/getestados',ubicacionController.getEstado);
auth.get('/getmunicipios',ubicacionController.getMunicipios);
auth.get('/guardarubicacion',ubicacionController.guardarUbicacion);


auth.get('/calificar',comentariosController.index);
auth.get('/guardarcalificacion',comentariosController.guardarCalificacion);

module.exports = auth;