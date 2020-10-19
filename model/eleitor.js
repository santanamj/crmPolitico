const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eleitoreschema = new Schema({
    nome: { type: String },
    email: { type: String },
    telefone: { type: String },
    celular: { type: String },
    celular1: { type: String },    
    parceiro: { type: String},
    grupo: { type: String },
    sexo: { type: String },
    dataNascimento: { type: String },
    domicilioEleitor: { type: String },    
    opcaoEleitoral: { type: String },  
    visita: {type: String},      
    bairro: { type: String },
    rua: { type: String },
    cep: { type: String },
    cidade: { type: String },
    estado: { type: String },
    numeroEndereco: { type: String },
    observacao: { type: String },
    statusVoto: { type: String },
    rate: { type: String },
    createdAt: { type: Date, default: new Date(Date.now()) },
    avatarEleitor: [{
        secure_url: String,
        values: Schema.Types.Mixed
    }],

});

module.exports = mongoose.model('Eleitor', eleitoreschema)