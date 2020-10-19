//const Grupo = require('./../model/grupo');
const Eleitor = require('./../model/eleitor');
const Solicitacao = require ('./../model/solicitacao');
const Parceiro = require ('./../model/parceiro');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary');
const moment = require ('moment');
const cloudinaryStorage = require('multer-storage-cloudinary');
const path = require('path');
cloudinary.config({
    cloud_name: 'djbfmiwlg',
    api_key: '935956179985733',
    api_secret: 'paNLYmeQHHPGXFHSI23PeDkzVqM'
});
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "uploads",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});
exports.newEleitor = (req, res, next) => {
     const mydataNascimento = req.body.datnsc;
    const dataNascimento = mydataNascimento.formatted;
    const complemento = req.body.endereco.complemento;    
    const rua = `${req.body.endereco.rua} - ${complemento}`;
    console.log(req.body);
    const eleitor = new Eleitor({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        celular: req.body.celular,
        celular1: req.body.celular1,
        parceiro: req.body.parceiro,
        grupo: req.body.grupo,
        sexo: req.body.sexo,
        dataNascimento: req.body.datnsc,
        domicilioEleitor: req.body.domicilioEleitor,       
        opcaoEleitoral: req.body.opcaoEleitoral,        
        endereco: req.body.endereco,
        bairro: req.body.endereco.bairro,
        rua: rua,
        cep: req.body.endereco.cep,
        cidade: req.body.endereco.cidade,
        estado: req.body.endereco.estado,
        numeroEndereco: req.body.endereco.numero,
        statusVoto: req.body.statusVoto,
        observacao: req.body.observacao,
        visita: 'não'
        
    })
    eleitor.save((err, eleitor) => {       
        if (err) {
            res.json({ success: false, message: err });
        }  else {
            console.log('data', eleitor)            
            res.json({ success: true, message: 'created eleitor' });
        
    }
    })
} 
exports.checkCelular = (req, res, next) => {
    // Check if celular was provided in paramaters
    if (!req.params.celular) {
      res.json({ success: false, message: 'Celular was not provided' }); // Return error
    } else {
      // Look for celular in database
      Eleitor.findOne({ celular: req.params.celular }, (err, eleitor) => { // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if eleitor's celular was found
          if (eleitor) {
            res.json({ success: false, message: 'Eleitor já existe' }); // Return as taken celular
          } else {
            res.json({ success: true, message: 'Eleitor disponível' }); // Return as vailable celular
          }
        }
      });
    }
  }
exports.getlistEleitores = (req, res, next) => {   
    Eleitor.find({}, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
         res.json(eleitores)
 }
    }).sort({ 'nome': 1 }).limit(10);
}
exports.getcounttEleitores = (req, res, next) => {   
    Eleitor.countDocuments({}, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
         res.json(eleitores)
 }
    })//.sort();
}

exports.getEleitores = (req, res, next) => {
    var s = req.query.term;    
    console.log(req.query)
    Eleitor.find({
        bairro: s
    }, (err, eleitores) => {

        if (err) {
            res.json({ success: false, err })
        } else {
           
            res.json(eleitores)

        }
    }).sort({ 'nome': 1 });
}
exports.getGEleitores = (req, res, next) => {
    var s = req.query.term;    
    console.log(req.query)
    Eleitor.find({
        grupo: s
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getVEleitores = (req, res, next) => {
    var s = req.query.term;    
    console.log(req.query)
    Eleitor.find({
        visita: s
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getSexoEleitores = (req, res, next) => {
    var s = req.query.term; 
   Eleitor.find({
        sexo: s
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getStatusEleitores = (req, res, next) => {
    var s = req.query.term; 
   Eleitor.find({
    statusVoto: s
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getRatesEleitores = (req, res, next) => {
    var s = req.query.term; 
   Eleitor.find({
    rate: s
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getDatesEleitores = (req, res, next) => {
    console.log('geral', req.query)
    const inicialDate = req.query.dateInit;
    const finalDate = req.query.dateFinish ;
    console.log('inicial', inicialDate)
    console.log('final', finalDate)
    
   Eleitor.find({
    dataNascimento: { "$gte": inicialDate, "$lt": finalDate }
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {  
            console.log(eleitores)         
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getPEleitores = (req, res, next) => {
    var s = req.query.term;    
    console.log(req.query)
    Eleitor.find({
        parceiro: s
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.getLastEleitores = (req, res, next) => {  
    var now = new Date(); 
    var start = now.setDate(now.getDate() - 30);    
    console.log(start)
    Eleitor.countDocuments({}, (err, totalEleitor )=>{
    Eleitor.countDocuments({
        "createdAt" :{"$gte":start} 
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else { 
            const Count = {
                countTotal : totalEleitor,
                last30 : eleitores
            } 
            console.log(Count)         
            res.json(Count)
        }
    }).sort({ 'nome': 1 });
})
}
exports.getNomeEleitores = (req, res, next) => {
    var s = req.query.term;    
    console.log(req.query)
    Eleitor.find({
        nome: { $regex: s, $options: "i" } 
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
const isData = (newObject, Newdate, dateEnd)=> {    
    console.log('Newdate', dateEnd)    
    
    if( dateEnd !== 'undefined' && dateEnd !== 'Invalid date' ){       
        return Object.assign({}, newObject, Newdate) 
    }  
    else{
        return newObject
    }
}
const isName = (newObject, nome)=> {  
    console.log('nome', nome)    
    mynome = {
        nome: { $regex: nome, $options: "i" }
    }   
    if(nome !== 'undefined' ){       
        return Object.assign({}, newObject, mynome) 
    }
    else{
        return newObject
    }
}

exports.getAvEleitores = async (req, res, next) => {  
    var eleitorDate = '';
    var bairro = req.query.bairros;  
    var grupo = req.query.grupos;
    var parceiro = req.query.parceiros; 
    var nome = req.query.nomes;
    var dateInit = req.query.dateInit;
    var dateEnd = req.query.dateFinish;
    var sexo = req.query.sexo;
    var rate = req.query.rate;
    var status = req.query.status
    const newdate = {dataNascimento: {
     $gte:dateInit,
     $lt:dateEnd
    }}    
    myquery= {
        bairro: bairro,
        grupo: grupo,
        parceiro: parceiro,
        sexo: sexo,
        rate: rate,
        statusVoto:  status 
    }    
    
    const newObject = Object.keys(myquery).reduce((acc, key) => {
        const _acc = acc;
        if (myquery[key] !== 'undefined') _acc[key] = myquery[key];
        return _acc;
      }, {}) 
    const allDate = await isData(newObject, newdate, dateEnd);    
    const allData = await isName(allDate, nome);      
    console.log(allData) 
    Eleitor.find(allData, (err, eleitores) => {       
        if (err) {            
            res.json({ success: false, err })
        } else {           
            res.json(eleitores)
        }
    }).sort({ 'nome': 1 });
}
exports.oneEleitor = (req, res, next) => {
    const eleitorId = req.params.id;   
    Eleitor.findById({ '_id': eleitorId }, (err, eleitor) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!eleitor) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                console.log(eleitor)
                res.json(eleitor);
            }
        }
    })
}
exports.oneEleitorSolicitacao = (req, res, next) => {
    const eleitorId = req.params.id;   
    Eleitor.findById({ '_id': eleitorId }, (err, eleitor) => {       
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!eleitor) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                //get solicitacoes             
                Solicitacao.find({ 'eleitor': String(eleitorId) }, (req, solicitacoes) => {
                    if (err) {
                        res.status(500).send({ message: 'erro em buscar solicitacoes' })
                    } else {                        
                        res.json(solicitacoes);
                    }
                })

            }
        }
    })
}
exports.oneEleitorTitulo = (req, res, next) => {
    const eleitorId = req.params.id;
    Eleitor.findById({ '_id': eleitorId }, (err, eleitor) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!eleitor) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
               
                const titulo = eleitor.titulo;
                Titulo.find({ 'titulo': titulo }, (req, crntitulos) => {
                    if (err) {
                        res.status(500).send({ message: 'erro em buscar crnmanutencoes' })
                    } else {                        
                        res.json(crntitulos);
                    }
                }).sort()//.limit(5);      

            }
        }
    })
}

exports.imgEleitor = (req, res) => {
    console.log('Meu log', req.params)
    const eleitorId = req.params.id;
    const upload = multer({ storage: storage }).array('files[]', 12);
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }
        console.log("before", req.files)
        files = req.files;
        Eleitor.find({ '_id': eleitorId }, (err, eleitores) => {
            console.log('eleitores', eleitores)
            Eleitor.findByIdAndUpdate(eleitores, { avatarEleitor: files }, { new: true }, (err, eleitores) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el usuario' });
                } else {
                    if (!eleitores) {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                    } else {

                        res.json({ success: true, message: 'usuário atualizado' });
                    }
                }
            });
        })
    })
}
exports.grupo = (req, res) => {
    Grupo.find({}, (err, grupos) => {
        if (err) {
            res.json({ success: false, err })
        } else {
            res.json(grupos)
        }
    })
}
exports.getAllEleitores = (req, res, next)=>{   
    const start = new Date(new Date().setDate(new Date().getDate() - 30));  
    const startDate = moment(start).format('YYYY-MM-DD')
    const end =  new Date();  
    const endDate = moment(end).format('YYYY-MM-DD')
      console.log(startDate, endDate)
      Eleitor.find({
          "createdAt" :{"$gte":startDate} 
      }, (err, eleitores)=>{        
          if(err){
              res.json({success:false, err} )
          }else{                
              const visiDate = eleitores.map(item =>{ return { createdAt: new Date(item.createdAt).toISOString().slice(0,10) } })
              const array  = eleitores.map((item => item.parceiro))
             const eleitorDate =  array.reduce(function (allNames, parceiro) { 
                  if (parceiro in allNames) {
                    allNames[parceiro]++;
                  }
                  else {
                    allNames[parceiro] = 1;
                  }               
                  return allNames;
                }, {})           
              const onlyDate = Object.values(eleitorDate);
              const propertDay = Object.keys(eleitorDate);
              const result = [].concat({date:onlyDate}, {day:propertDay})
              //console.log('onlyDate', onlyDate)
              res.json(result)           
            }
      }).sort(); // Sort orders from newest to oldest
  }
  exports.getADateEleitores = (req, res, next)=>{   
    const start = new Date(new Date().setDate(new Date().getDate() - 30));  
    const startDate = moment(start).format('YYYY-MM-DD')
    const end =  new Date();  
    const endDate = moment(end).format('YYYY-MM-DD')
      console.log(startDate, endDate)
      Eleitor.find({
          "createdAt" :{"$gte":startDate} 
      }, (err, eleitores)=>{        
          if(err){
              res.json({success:false, err} )
          }else{   
                     
              const visiDate = eleitores.map(item =>{ return { createdAt: new Date(item.createdAt).toISOString().slice(0,10) } })
                       
              const array  = eleitores.map((item => new Date(item.createdAt).toISOString().slice(0,10)))
               console.log('value', array)
              const eleitorDate =  array.reduce(function (allNames, createdAt) { 
                  if (createdAt in allNames) {
                    allNames[createdAt]++;
                  }
                  else {
                    allNames[createdAt] = 1;
                  }               
                  return allNames;
                }, {})           
              const onlyDate = Object.values(eleitorDate);
              const propertDay = Object.keys(eleitorDate);
              const result = [].concat({date:onlyDate}, {day:propertDay})
              //console.log('onlyDate', onlyDate)
              res.json(result)
             console.log('propertDay', result)
             console.log(onlyDate)
          }
      }).sort(); // Sort orders from newest to oldest
  }
exports.updateEleitor =  (req, res) =>{     
    console.log(req.body) 
    if (!req.body._id) {
      res.json({ success: false, message: 'No eleitor id provided' }); // Return error message
    } else {
  var data = req.body; 
  Eleitor.findByIdAndUpdate(req.body._id, data,  (err, eleitor) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!eleitor) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {       
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }  
  }
  exports.updateVisitaEleitor =  (req, res) =>{     
    console.log(req.body) 
    if (!req.body._id) {
      res.json({ success: false, message: 'No eleitor id provided' }); // Return error message
    } else {
  var data = req.body.visita; 
  Eleitor.findByIdAndUpdate(req.body._id, {visita: 'sim'}, (err, eleitor) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!eleitor) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {       
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }  
  }
  exports.updateRating =  (req, res) =>{     
    console.log(req.body) 
    if (!req.body._id) {
      res.json({ success: false, message: 'No eleitor id provided' }); // Return error message
    } else {
  var data = req.body.rate; 
  Eleitor.findByIdAndUpdate(req.body._id, {rate: data}, (err, eleitor) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!eleitor) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {       
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }  
  }
  exports.deleteEleitor = (req, res) => {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
    Eleitor.findOne({ _id: req.params.id }, (err, eleitor) => {
        console.log('antes', req.params.id)
        if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if eleitor was found in database
            if (!eleitor) {
              res.json({ success: false, messasge: 'Eleitor was not found' }); // Return error message
            }  else {       
            eleitor.remove((err) => {
                console.log('primeir SubEleitor', eleitor)
                if (err) {
                    res.json({ success: false, message: err }); // Return error message
                  } else {
                    res.json({ success: true, message: 'eleitor deletado!' }), console.log('SubEleitor', eleitor); // Return success message
                  }
            });
        }
    }
    });
}
};
  