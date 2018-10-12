let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Message =require('../model/message');
let Company = require('../model/company');

let studentSchema = new Schema({
                regid :{type : String,required:true,unique:true},
                firstName:{type : String,required:true},
                middleName:{type : String,required:true},
                lastName:{type : String,required:true},
                email:{type : String,required:true,unique:true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/},
                oldpassword:{type:String,required:true},
                newpassword:{type:String,required:true},
                admyear:{type:Number,required:true},
                branch:{type:String,required:true},
                inserted:{type:Number,required:true},
                placed : {type:Boolean,required:true},
                company : {type:Schema.Types.ObjectId,ref:'Company'},
                messages:[{type:Schema.Types.ObjectId,ref:'Message'}]

        },{
                collection:"students"
        });

module.exports = mongoose.model('Student',studentSchema);