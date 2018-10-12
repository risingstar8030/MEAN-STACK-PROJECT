let mongoose = require('mongoose');
let Schema = mongoose.Schema;

 
module.exports = mongoose.model('Admin',new Schema({
    regid :{type : String,required:true,unique:true},
    firstname:{type : String,required:true},
    lastname:{type : String,required:true},
    email:{type : String,required:true,unique:true,
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/},
    oldpassword:{type:String,required:true},
    newpassword:{type:String,required:true},
    department:{type:String,required:true},

},{
    collection:"admins"
})
);