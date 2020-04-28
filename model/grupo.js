const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const gruposchema = new Schema({   
    titulo: {type: String},
    descricao: {type: String}
   
});

module.exports = mongoose.model('Grupo', gruposchema)