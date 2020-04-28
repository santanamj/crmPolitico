const graficosController = require ('./../controllers/grafico');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

// api.post('/newGrafico',  graficosController.newGrafico);
// api.get('/getlistGraficos',  graficosController.getlistGraficos);
// api.get('/oneGrafico/:id',  graficosController.oneGrafico);
// api.post('/newTipo',  graficosController.newTipo);
// api.get('/getlistTipos',  graficosController.getlistTipos);
 module.exports = api;