const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const solicitacoeschema = new Schema({   
    titulo: {type: String},
    descricao: {type: String},
    obs: {type:String},
    status: {type: String},
    eleitor: {type: String},
    createdAt: { type: Date, default: new Date(Date.now()) },
   
});

module.exports = mongoose.model('solicitacao', solicitacoeschema)