//const Agenda = require('./../model/agenda');
const Agenda = require('./../model/agenda');
const Tipo = require('./../model/tipo');
const Solicitacao = require ('./../model/solicitacao');
const fs = require('fs');

exports.newAgenda = (req, res, next) => {  
    const agenda = new Agenda({
        start: req.body.start,
        title: req.body.title,
        description: req.body.description,
        tipo: req.body.tipo,
        draggable: req.body.draggable  
     })
    agenda.save((err, agenda) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {    
            console.log(agenda)            
            res.json({ data: agenda, success: true, message: 'created agenda' });
        }
    })
} 

exports.getlistAgendas = (req, res, next) => {
   Agenda.find({}, (err, agendas) => {
  if (err) {
            res.json({ success: false, err })
        } else {           
            res.send(agendas)
        }
    }).sort({ '_id': -1 });
}
exports.getCountAgendas = (req, res, next) => {
    Agenda.countDocuments({}, (err, agendas) => {
   if (err) {
             res.json({ success: false, err })
         } else {           
             res.json(agendas)
         }
     })
 }
exports.oneAgenda = (req, res, next) => {
    const agendaId = req.params.id;
    console.log(req.params.id)
    Agenda.findById({ '_id': agendaId }, (err, agenda) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!agenda) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                res.send(agenda);
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
 exports.deleteAgenda = (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
    Agenda.findOne({ _id: req.params.id }, (err, agenda) => {
        console.log('antes', req.params.id)
        if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if agenda was found in database
            if (!agenda) {
              res.json({ success: false, messasge: 'Agenda was not found' }); // Return error message
            }  else {       
            agenda.remove((err) => {
                console.log('primeir SubAgenda', agenda)
                if (err) {
                    res.json({ success: false, message: err }); // Return error message
                  } else {
                    res.json({ success: true, message: 'agenda deletado!' }), console.log('SubAgenda', agenda); // Return success message
                  }
            });
        }
    }
    });
}
};
exports.updateAgenda =  (req, res) =>{     
    console.log(req.body) 
    if (!req.body._id) {
      res.json({ success: false, message: 'No dependente id provided' }); // Return error message
    } else {
  var data = req.body; 
  Agenda.findByIdAndUpdate(req.body._id, data,  (err, agenda) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!agenda) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {      
          console.log('agenda', agenda) 
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }  
  }
  exports.deleteAgenda = (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
    Agenda.findOne({ _id: req.params.id }, (err, agenda) => {
        console.log('antes', req.params.id)
        if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if agenda was found in database
            if (!agenda) {
              res.json({ success: false, messasge: 'Agenda was not found' }); // Return error message
            }  else {       
            agenda.remove((err) => {
                console.log('primeir SubAgenda', agenda)
                if (err) {
                    res.json({ success: false, message: err }); // Return error message
                  } else {
                    res.json({ success: true, message: 'agenda deletado!' }), console.log('SubAgenda', agenda); // Return success message
                  }
            });
        }
    }
    });
}
};