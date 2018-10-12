var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('message',new Schema({
    content:{type:String,required:true},
    student:{type:Schema.Types.ObjectId,ref:'Student'}
},{
    collection:'messages'
}));
