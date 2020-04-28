const eleitoresController = require ('./../controllers/eleitor');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newEleitor',  eleitoresController.newEleitor);
api.get('/getEleitores',  eleitoresController.getEleitores);
api.get('/getGEleitores',  eleitoresController.getGEleitores);
api.get('/getPEleitores',  eleitoresController.getPEleitores);
api.get('/getLastEleitores',  eleitoresController.getLastEleitores);
api.get('/getAllEleitores', eleitoresController.getAllEleitores);
api.get('/getNomeEleitores',  eleitoresController.getNomeEleitores);
api.get('/getAvEleitores',  eleitoresController.getAvEleitores);
api.get('/getlistEleitores',  eleitoresController.getlistEleitores);
api.get('/oneEleitorSolicitacao/:id', eleitoresController.oneEleitorSolicitacao)
api.get('/grupo', eleitoresController.grupo);
//api.get('/getEleitores', AuthenticationControler.use, eleitoresController.getEleitores);
//api.get('/oneEleitorManutencao/:id',  eleitoresController.oneEleitorManutencao);
api.get('/oneEleitorTitulo/:id',  eleitoresController.oneEleitorTitulo);
api.get('/oneEleitor/:id',  eleitoresController.oneEleitor);
api.post('/imgEleitor/:id',  eleitoresController.imgEleitor);


//api.put('/imgEleitorup',  eleitoresController.imgEleitorup);
module.exports = api;