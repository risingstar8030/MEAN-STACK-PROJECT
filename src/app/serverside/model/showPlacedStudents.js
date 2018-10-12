let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('PlacedStudents',new Schema({

    companyName:{type:String,required:true},
    students:{type:Array,required:true}

},{
    collection:'placedStudents'
}));