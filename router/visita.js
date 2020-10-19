const visitasController = require ('./../controllers/visita');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newVisita',  visitasController.newVisita);
api.get('/getVisitas/:id',  visitasController.getVisitas);
api.get('/getAllVisitas', visitasController.getAllVisitas)
//api.get('/getVisitas', AuthenticationControler.use, visitasController.getVisitas);
api.get('/oneVisita/:id',  visitasController.oneVisita);


module.exports = api;