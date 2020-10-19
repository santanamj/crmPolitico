const solicitacoesController = require ('./../controllers/solicitacao');
const AuthenticationControler = require ('../controllers/user'),
express = require ('express');

var api = express.Router();

api.post('/newSolicitacao',  solicitacoesController.newSolicitacao);
api.get('/oneSolicitacao/:id',  solicitacoesController.oneSolicitacao);
api.get('/getsolicitacoes',  solicitacoesController.getsolicitacoes);
api.put('/updateSolicitacao',  solicitacoesController.updateSolicitacao);
// api.get('/getsolicitacoes',  solicitacoesController.getsolicitacoes);
// api.get('/getlistsolicitacoes',  solicitacoesController.getlistsolicitacoes);
// api.get('/grupo', solicitacoesController.grupo);
// //api.get('/getsolicitacoes', AuthenticationControler.use, solicitacoesController.getsolicitacoes);
// //api.get('/onesolicitacaoManutencao/:id',  solicitacoesController.onesolicitacaoManutencao);

// api.get('/onesolicitacao/:id',  solicitacoesController.onesolicitacao);
// api.post('/imgsolicitacao/:id',  solicitacoesController.imgsolicitacao);
// api.get('/numerotitulo', solicitacoesController.numerotitulo)
// api.put('/updateNumerotitulo',  solicitacoesController.updatenumeroTitulo);
//api.put('/imgsolicitacaoup',  solicitacoesController.imgsolicitacaoup);
module.exports = api;