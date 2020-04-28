const Solicitacao = require('./../model/solicitacao');
const Eleitor = require('./../model/solicitacao');
const fs = require('fs');


exports.newSolicitacao = (req, res, next) => {

    const solicitacao = new Solicitacao({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        obs: req.body.obs,
        status: req.body.status,
        eleitor: req.body.eleitor
    })
    solicitacao.save((err, solicitacao) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            console.log('data', solicitacao)
            res.json({ success: true, message: 'created solicitacao' });
        }
    })
}
exports.oneSolicitacao = (req, res, next) => {
    const solicitacaoId = req.params.id;
    Solicitacao.findById({ '_id': solicitacaoId }, (err, solicitacao) => {
        console.log('solicitacao', solicitacao)
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!solicitacao) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                console.log(solicitacao)
                res.send(solicitacao);
            }
        }
    })
}
exports.updateSolicitacao =  (req, res) =>{    
   
    if (!req.body._id) {
      res.json({ success: false, message: 'No dependente id provided' }); // Return error message
    } else {
  var data = req.body;
 
  Solicitacao.findByIdAndUpdate(req.body._id, data,  (err, solicitacao) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!solicitacao) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {
        console.log(solicitacao)
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }
  
  }