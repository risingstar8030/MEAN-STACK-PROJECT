let mongooose = require('mongoose');
let Schema = mongooose.Schema;
let Company = require('../model/company');

module.exports = mongooose.model('YearlyCompanies',new Schema({

    year1:{type:Number,required:true},
    year2:{type:Number,required:true},
    companiesVisited:[
        {type:Schema.Types.ObjectId,ref:'Company'}
    ]

},{
    collection:"yearlyCompanies"
}));