const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const Schema =  mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const agendaschema = new Schema({   
    title: {type: String},
    description:{type:String},
    tipo: {type: String},
    start: {type: Date},
    draggable: {type: Boolean}
   
});

module.exports = mongoose.model('Agenda', agendaschema)