const agendasController = require ('./../controllers/agenda');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newAgenda',  agendasController.newAgenda);
api.get('/getlistAgendas',  agendasController.getlistAgendas);
api.get('/getCountAgendas',  agendasController.getCountAgendas);
api.get('/oneAgenda/:id',  agendasController.oneAgenda);
//TIPOS
api.post('/newTipo',  agendasController.newTipo);
api.get('/getlistTipos',  agendasController.getlistTipos);
api.delete('/deleteAgenda/:id', agendasController.deleteAgenda);
api.put('/editAgenda', agendasController.updateAgenda);
module.exports = api;