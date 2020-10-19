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
            res.json({ success: true, message: 'created grupo' });
        }
    })
} 

exports.getlistGrupos = (req, res, next) => {
   Grupo.find({}, (err, grupos) => {
  if (err) {
            res.json({ success: false, err })
        } else {           
            res.send(grupos)
        }
    }).sort({ '_id': -1 });
}
exports.getCountGrupos = (req, res, next) => {
    Grupo.countDocuments({}, (err, grupos) => {
   if (err) {
             res.json({ success: false, err })
         } else {           
             res.json(grupos)
         }
     })
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
 exports.updateGrupo =  (req, res) =>{     
    console.log(req.body) 
    if (!req.body._id) {
      res.json({ success: false, message: 'No dependente id provided' }); // Return error message
    } else {
  var data = req.body; 
  Grupo.findByIdAndUpdate(req.body._id, data,  (err, grupo) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!grupo) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {      
          console.log('grupo', grupo) 
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }  
  }
 exports.deleteGrupo = (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
    Grupo.findOne({ _id: req.params.id }, (err, grupo) => {
        console.log('antes', req.params.id)
        if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if grupo was found in database
            if (!grupo) {
              res.json({ success: false, messasge: 'Grupo was not found' }); // Return error message
            }  else {       
            grupo.remove((err) => {
                console.log('primeir SubGrupo', grupo)
                if (err) {
                    res.json({ success: false, message: err }); // Return error message
                  } else {
                    res.json({ success: true, message: 'grupo deletado!' }), console.log('SubGrupo', grupo); // Return success message
                  }
            });
        }
    }
    });
}
};
  