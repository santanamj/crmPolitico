const gruposController = require ('./../controllers/grupo');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newGrupo',  gruposController.newGrupo);
api.get('/getlistGrupos',  gruposController.getlistGrupos);
api.get('/getCountGrupos',  gruposController.getCountGrupos);
api.get('/oneGrupo/:id',  gruposController.oneGrupo);
//TIPOS
api.post('/newTipo',  gruposController.newTipo);
api.get('/getlistTipos',  gruposController.getlistTipos);
api.put('/editGrupo', gruposController.updateGrupo);
api.delete('/deleteGrupo/:id', gruposController.deleteGrupo);
module.exports = api;