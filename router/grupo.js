const gruposController = require ('./../controllers/grupo');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newGrupo',  gruposController.newGrupo);
api.get('/getlistGrupos',  gruposController.getlistGrupos);
api.get('/oneGrupo/:id',  gruposController.oneGrupo);
//TIPOS
api.post('/newTipo',  gruposController.newTipo);
api.get('/getlistTipos',  gruposController.getlistTipos);
module.exports = api;