let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Student = require('../model/student');
let YearlyCompanies = require('../model/eachyearcompanies');

let schema = new Schema({
    
    date : {type:String,required:true},
    day : {type:String,required:true},
    time : {type:String,required:true},
    companyName:{type:String,required:true},
    ctc : {type:Number,required:true},
    website:{type:String,required:true},
    comp:{type:Boolean,required:true},
    it:{type:Boolean,required:true},
    entc:{type:Boolean,required:true},
    activity1:{type:String},
    activity2:{type:String},
    activity3:{type:String},
    venue1:{type:String},
    venue2:{type:String},
    venue3:{type:String},
    skills:{type:String},
    criteria : {type:Number,required:true},
    showCompanyToStudents:{type:Boolean,required:true},
    showPlacedStudents:{type:Boolean,required:true},
    backlog:{type:String,required:true},
    studentsPlaced:[{type:Schema.Types.ObjectId,ref:'Student'}],
    academicYear:{type:String,required:true},
},
{
collection:"upcomingCompanies"
});


module.exports = mongoose.model("Company",schema);
