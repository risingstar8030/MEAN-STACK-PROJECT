var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Student = require('../model/student');

var deptSchema = new Schema({
    branch:{type:String,required:true},
    year:{type:Number,required:true},
    students:[{type:Schema.Types.ObjectId,ref:'Student'}]
},{
    collection:"departments"
});


module.exports = mongoose.model('Department',deptSchema);