//const Grupo = require('./../model/grupo');
const Grupo = require('./../model/grupo');
const Tipo = require('./../model/tipo');
const Solicitacao = require ('./../model/solicitacao');
const fs = require('fs');

exports.newGrupo = (req, res, next) => {  
    const grupo = new Grupo({
        titulo: req.body.titulo,
        descricao: req.body.descricao    
     })
    grupo.save((err, grupo) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            console.log('data', grupo)            
            res.json({ success: true, message: 'created grupo' });
        }
    })
} 

exports.getlistGrupos = (req, res, next) => {
   Grupo.find({}, (err, grupos) => {
  if (err) {
            res.json({ success: false, err })
        } else {
            console.log(grupos)
            res.send(grupos)
        }
    }).sort({ '_id': -1 });
}
exports.oneGrupo = (req, res, next) => {
    const grupoId = req.params.id;
    console.log(req.params.id)
    Grupo.findById({ '_id': grupoId }, (err, grupo) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!grupo) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                res.send(grupo);
            }
        }
    })
}
//TIPOS
exports.newTipo = (req, res, next) => {  
    const tipo = new Tipo({
        titulo: req.body.titulo,
        descricao: req.body.descricao    
     })
    tipo.save((err, tipo) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            console.log('data', tipo)            
            res.json({ success: true, message: 'created tipo' });
        }
    })
} 
exports.getlistTipos = (req, res, next) => {
    Tipo.find({}, (err, tipos) => {
   if (err) {
             res.json({ success: false, err })
         } else {
            console.log('data', tipos)
             res.send(tipos)
         }
     }).sort({ '_id': -1 });
 }
  