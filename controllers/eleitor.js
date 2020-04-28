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
exports.getlistEleitores = (req, res, next) => {   
    Eleitor.find({}, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
         res.send(eleitores)
 }
    }).sort({ '_id': -1 });
}
exports.getlistEleitores = (req, res, next) => {
    Eleitor.find({}, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
          res.send(eleitores)
          }
    }).sort({ '_id': -1 });
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
           
            res.send(eleitores)

        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
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
           
            res.send(eleitores)
        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
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
           
            res.send(eleitores)
        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
}
exports.getLastEleitores = (req, res, next) => {  
    var now = new Date(); 
    var start = now.setDate(now.getDate() - 30);    
    console.log(start)
    Eleitor.find({
        "createdAt" :{"$gte":start} 
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
           
            res.send(eleitores)
        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
}
exports.getNomeEleitores = (req, res, next) => {
    var s = req.query.term;    
    console.log(req.query)
    Eleitor.find({
        nome: { $regex: new RegExp(s) } 
    }, (err, eleitores) => {
        if (err) {
            res.json({ success: false, err })
        } else {
           
            res.send(eleitores)
        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
}
const isData = (newObject, nome)=> {
    mynome = {
        nome: { $regex: new RegExp(nome) }
    }
    if(nome !== 'undefined'){       
        return Object.assign({}, newObject, mynome) 
    }else{
        return newObject
    }
}
exports.getAvEleitores = async (req, res, next) => {  
    var bairro = req.query.bairros;  
    var grupo = req.query.grupos;
    var parceiro = req.query.parceiros; 
    var nome = req.query.nomes;     
    myquery= {
        bairro: bairro,
        grupo: grupo,
        parceiro: parceiro        
    }
    const newObject = Object.keys(myquery).reduce((acc, key) => {
        const _acc = acc;
        if (myquery[key] !== 'undefined') _acc[key] = myquery[key];
        return _acc;
      }, {})    
    const allData = await isData(newObject, nome);      
    Eleitor.find(allData, (err, eleitores) => {
        console.log(allData)
        if (err) {            
            res.json({ success: false, err })
        } else {           
            res.send(eleitores)
        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
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
                res.send(eleitor);
            }
        }
    })
}
exports.oneEleitorSolicitacao = (req, res, next) => {
    const eleitorId = req.params.id;   
    console.log('eleitorId', eleitorId)
    Eleitor.findById({ '_id': eleitorId }, (err, eleitor) => {
        console.log(eleitor)
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
                        console.log(solicitacoes)
                        res.send(solicitacoes);
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
                //get dependentes
                const titulo = eleitor.titulo;
                Titulo.find({ 'titulo': titulo }, (req, crntitulos) => {
                    if (err) {
                        res.status(500).send({ message: 'erro em buscar crnmanutencoes' })
                    } else {
                        console.log(crntitulos)
                        res.send(crntitulos);
                    }
                }).sort({ '_id': -1 })//.limit(5);      

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

                        res.send({ success: true, message: 'usuário atualizado' });
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
              res.send(result)
             console.log('propertDay', result)
             console.log(onlyDate)
          }
      }).sort(); // Sort orders from newest to oldest
  }

  