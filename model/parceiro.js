const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const parceiroschema = new Schema({   
    nome: {type: String},
    email: {type: String},
    telefone: {type:String},
    celular: {type: String},
    celular1: {type: String}, 
    tipo: {type: String},
    grupo: {type: String},    
    sexo: {type: String},  
    dataNascimento: {type: String},
    domicilioParceiro:{type: String},
    indicaoContato: {type: String},
    opcaoParceiroal: {type: String},  
    quemIndicou: {type: String},
    endereco:{type:Array},  
    observacao: {type:String},      
    createdAt: { type: Date, default: new Date(Date.now()) },   
    avatarParceiro: [{
        secure_url: String,
        values: Schema.Types.Mixed
    }],
   
});

module.exports = mongoose.model('Parceiro', parceiroschema)