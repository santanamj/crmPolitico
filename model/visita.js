const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const visitaSchema = new Schema({   
    nome: {type: String},
    createdAt: { type: Date, default: new Date(Date.now()) },
    convidado: {type: String},
    titulo: {type: String}    
});

module.exports = mongoose.model('Visita', visitaSchema)