const eleitoresController = require ('./../controllers/eleitor');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newEleitor',  eleitoresController.newEleitor);
api.get('/checkCelular/:celular', eleitoresController.checkCelular);
api.get('/getEleitores',  eleitoresController.getEleitores);
api.get('/getGEleitores',  eleitoresController.getGEleitores);
api.get('/getPEleitores',  eleitoresController.getPEleitores);
api.get('/getVEleitores',  eleitoresController.getVEleitores);
api.get('/getStatusEleitores',  eleitoresController.getStatusEleitores);
api.get('/getRatesEleitores',  eleitoresController.getRatesEleitores);
api.get('/getDatesEleitores',  eleitoresController.getDatesEleitores);
api.get('/getSexoEleitores',  eleitoresController.getSexoEleitores);
api.get('/getLastEleitores',  eleitoresController.getLastEleitores);
api.get('/getAllEleitores', eleitoresController.getAllEleitores);
api.get('/getADateEleitores', eleitoresController.getADateEleitores);
api.get('/getNomeEleitores',  eleitoresController.getNomeEleitores);
api.get('/getAvEleitores',  eleitoresController.getAvEleitores);
api.get('/getlistEleitores',  eleitoresController.getlistEleitores);
api.get('/getcounttEleitores',  eleitoresController.getcounttEleitores);
api.get('/oneEleitorSolicitacao/:id', eleitoresController.oneEleitorSolicitacao)
api.get('/grupo', eleitoresController.grupo);
api.put('/updateEleitor', eleitoresController.updateEleitor);
api.put('/updateVisitaEleitor', eleitoresController.updateVisitaEleitor);
api.put('/updateRating', eleitoresController.updateRating );
api.delete('/deleteEleitor/:id', eleitoresController.deleteEleitor);
//api.get('/getEleitores', AuthenticationControler.use, eleitoresController.getEleitores);
//api.get('/oneEleitorManutencao/:id',  eleitoresController.oneEleitorManutencao);
api.get('/oneEleitorTitulo/:id',  eleitoresController.oneEleitorTitulo);
api.get('/oneEleitor/:id',  eleitoresController.oneEleitor);
api.post('/imgEleitor/:id',  eleitoresController.imgEleitor);


//api.put('/imgEleitorup',  eleitoresController.imgEleitorup);
module.exports = api;