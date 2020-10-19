const Visita = require ('./../model/visita');
const fs = require ('fs');
const Associado = require ('./../model/associados');
exports.newVisita = (req, res, next) => {
   const visita = new Visita({
   nome: req.body.nome,
   convidado: req.body.convidado,
   titulo: req.body.titulo
     })
    console.log(visita);
    visita.save((err, visita) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'created visita' });
        }
    })
};
exports.getVisitas = (req, res, next)=>{
    const associadoId = req.params.id;
   
    Associado.findById({'_id':associadoId}, (err, associado)=>{
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!associado){
            res.status(404).send({message:'Pedido não existe'})
        }else{ 
            const titulo = associado.titulo;
    Visita.find({'titulo': titulo}, (err, visitas)=>{
       
        if(err){
            res.json({success:false, err} )
        }else{
           
            res.send(visitas)
           
        }
    }).sort({ '_id': -1 }); // Sort orders from newest to oldest
}}})
}
exports.getAllVisitas = (req, res, next)=>{   
  const iniDate = req.query.initDate
  const split = iniDate.split('/');
  const novadataInit = split[1] + "/" +split[0]+"/"+split[2];
  const start = new Date(novadataInit); 
  //End date
 const endDate = req.query.endDate;
 const splitEnd = endDate.split('/');
 const novadataEnd = splitEnd[1] + "/" +splitEnd[0]+"/"+splitEnd[2];
 const end = new Date(novadataEnd);   
    console.log(start, end)
    Visita.find({
        "createdAt" :{"$gte":start, "$lt": end} 
    }, (err, visitas)=>{        
        if(err){
            res.json({success:false, err} )
        }else{            
            const visiDate = visitas.map(item =>{ return { createdAt: new Date(item.createdAt).toISOString().slice(0,10) } })
            console.log('visiDate', visiDate)            
            const array  = visitas.map((item => new Date(item.createdAt).toISOString().slice(0,10)))
             console.log('value', array)
            const visiteDate =  array.reduce(function (allNames, createdAt) { 
                if (createdAt in allNames) {
                  allNames[createdAt]++;
                }
                else {
                  allNames[createdAt] = 1;
                }               
                return allNames;
              }, {})           
            const onlyDate = Object.values(visiteDate);
            const propertDay = Object.keys(visiteDate);
            const result = [].concat({date:onlyDate}, {day:propertDay} )
            //console.log('onlyDate', onlyDate)
            res.send(result)
           console.log('propertDay', result)
           console.log(onlyDate)
        }
    }).sort({ '_id': -1 }); // Sort orders from newest to oldest
}
exports.oneVisita = (req, res, next)=>{
    console.log(req.params.id)
    const visitaId = req.params.id;
    Visita.findById(visitaId).populate().exec((err, visita)=>{
        console.log('meu', visita)
        if(err){
            res.status(500).send({message: 'Erro na solicitação'})
        }else{
            if(!visita){
            res.status(404).send({message:'Pedido não existe'})
        }else{
            res.status(200).send({visita}), console.log('SubVisita', visita);
        }
    }
    })
}
