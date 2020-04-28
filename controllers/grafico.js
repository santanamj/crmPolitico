const Eleitor = require ('./../model/eleitor');
const parceiro = require ('./../model/parceiro');
const grupo = require('./../model/grupo');


exports.getEleitorParceiro = (rerq, res)=>{
    const parceiro = req.params.parceiro;
    Eleitor.find({'parceiro': parceiro}, (err, eleitores)=>{
        if(err){
            console.log(err)
        }else{
            const countDays = eleitores.map(item=>{return  {createdAt: new Date(item.createdAt).toISOString().slice(0, 10) }}) 
            console.log('diaAddEleitor', diaAddEleitor);
            const eleitorporData = countDays.reduce((dataday, createdAt)=>{
                if(createdAt in dataday){
                    dataday[createdAt]++;
                }else{
                    dataday[createdAt]= 1;
                }
                return dataday
            }, {})
            console.log(eleitorporData)      
       }
    })
}
