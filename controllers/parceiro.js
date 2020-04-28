//const Grupo = require('./../model/grupo');
const Parceiro = require('./../model/parceiro');
const Solicitacao = require ('./../model/solicitacao');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary');
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
exports.newParceiro = (req, res, next) => {
     const mydataNascimento = req.body.datnsc;
    const dataNascimento = mydataNascimento.formatted    
    
    const parceiro = new Parceiro({
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        celular: req.body.celular,
        celular1: req.body.celular1,
        tipo: req.body.tipo,
        grupo: req.body.grupo,
        sexo: req.body.sexo,
        dataNascimento: dataNascimento,
        domicilioParceiro: req.body.domicilioParceiro,
        indicaoContato: req.body.indicaoContato,
        opcaoParceiroal: req.body.opcaoParceiroal,
        quemIndicou: req.body.quemIndicou,
        endereco: req.body.endereco,
        statusVoto: req.body.statusVoto,
        observacao: req.body.observacao,
        
    })
    parceiro.save((err, parceiro) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            console.log('data', parceiro)            
            res.json({ success: true, message: 'created parceiro' });
        }
    })
} 
exports.getlistParceiros = (req, res, next) => {
   
    Parceiro.find({}, (err, parceiros) => {

        if (err) {
            res.json({ success: false, err })
        } else {

            res.send(parceiros)

        }
    }).sort({ '_id': -1 });
}
exports.getParceiros = (req, res, next) => {
    var s = req.query.term;
    var t = req.query.titulo;
    console.log(t)
    Parceiro.find({
        nome: {
            $regex: new RegExp(s),
        },
        titulo: {
            $regex: new RegExp(t)

        }
    }, (err, parceiros) => {

        if (err) {
            res.json({ success: false, err })
        } else {

            res.send(parceiros)

        }
    }) // Sort orders from newest to oldest .sort({ '_id': -1 });
}
exports.oneParceiro = (req, res, next) => {
    const parceiroId = req.params.id;
    console.log(req.params.id)
    Parceiro.findById({ '_id': parceiroId }, (err, parceiro) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!parceiro) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                res.send(parceiro);
            }
        }
    })
}
exports.oneParceiroSolicitacao = (req, res, next) => {
    const parceiroId = req.params.id;   
    Parceiro.findById({ '_id': parceiroId }, (err, parceiro) => {
        console.log(parceiro)
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!parceiro) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                //get solicitacoes             
                Solicitacao.find({ 'parceiro': String(parceiroId) }, (req, solicitacoes) => {
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
exports.oneParceiroTitulo = (req, res, next) => {
    const parceiroId = req.params.id;
    Parceiro.findById({ '_id': parceiroId }, (err, parceiro) => {
        if (err) {
            res.status(500).send({ message: 'Erro na solicitação' })
        } else {
            if (!parceiro) {
                res.status(404).send({ message: 'Pedido não existe' })
            } else {
                //get dependentes
                const titulo = parceiro.titulo;
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

exports.imgParceiro = (req, res) => {
    console.log('Meu log', req.params)
    const parceiroId = req.params.id;
    const upload = multer({ storage: storage }).array('files[]', 12);
    upload(req, res, function (err) {
        if (err) {
            console.log(err, 'erro no upload')
        }
        console.log("before", req.files)
        files = req.files;
        Parceiro.find({ '_id': parceiroId }, (err, parceiros) => {
            console.log('parceiros', parceiros)
            Parceiro.findByIdAndUpdate(parceiros, { avatarParceiro: files }, { new: true }, (err, parceiros) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el usuario' });
                } else {
                    if (!parceiros) {
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
exports.numerotitulo = (req, res)=>{
    Numerotitulo.find({}, (err, numerotitulos)=>{
      if(err){
          res.json({success: false, message: err})
      }else{
      res.send(numerotitulos);
      }
  })
  }
  exports.updatenumeroTitulo =  (req, res) =>{
    if (!req.body._id) {
      res.json({ success: false, message: 'No dependente id provided' }); // Return error message
    } else {
  var data = req.body.numerotitulo;
  console.log("update nosso numero", data);
  Numerotitulo.findByIdAndUpdate({ _id: req.body._id }, { $set: { "valor": data } }, { new: true }, (err, parceiro) => {
   if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario' });
    } else {
      if (!parceiro) {
        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
      } else {
          
        res.status(200).send({ success: true, message: 'usuário atualizado' });
      }
    }
  });
  }
  
  }