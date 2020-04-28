const parceirosController = require ('./../controllers/parceiro');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newParceiro',  parceirosController.newParceiro);
api.get('/getParceiros',  parceirosController.getParceiros);
api.get('/getlistParceiros',  parceirosController.getlistParceiros);
api.get('/oneParceiroSolicitacao/:id',  parceirosController.oneParceiroSolicitacao);
api.get('/grupo', parceirosController.grupo);
//api.get('/getParceiros', AuthenticationControler.use, parceirosController.getParceiros);
//api.get('/oneParceiroManutencao/:id',  parceirosController.oneParceiroManutencao);
api.get('/oneParceiroTitulo/:id',  parceirosController.oneParceiroTitulo);
api.get('/oneParceiro/:id',  parceirosController.oneParceiro);
api.post('/imgParceiro/:id',  parceirosController.imgParceiro);
api.get('/numerotitulo', parceirosController.numerotitulo)
api.put('/updateNumerotitulo',  parceirosController.updatenumeroTitulo);
//api.put('/imgParceiroup',  parceirosController.imgParceiroup);
module.exports = api;