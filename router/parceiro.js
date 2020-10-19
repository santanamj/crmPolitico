const parceirosController = require ('./../controllers/parceiro');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newParceiro',  parceirosController.newParceiro);
api.get('/getParceiros',  parceirosController.getParceiros);
api.get('/getlistParceiros',  parceirosController.getlistParceiros);
api.get('/oneParceiroSolicitacao/:id',  parceirosController.oneParceiroSolicitacao);
api.get('/getCountParceiros', parceirosController.getCountParceiros);
//api.get('/getParceiros', AuthenticationControler.use, parceirosController.getParceiros);
//api.get('/oneParceiroManutencao/:id',  parceirosController.oneParceiroManutencao);
api.get('/oneParceiro/:id',  parceirosController.oneParceiro);
api.post('/imgParceiro/:id',  parceirosController.imgParceiro);
api.put('/updateParceiro', parceirosController.updateParceiro);
api.delete('/deleteParceiro/:id', parceirosController.deleteParceiro);
//api.put('/imgParceiroup',  parceirosController.imgParceiroup);
module.exports = api;