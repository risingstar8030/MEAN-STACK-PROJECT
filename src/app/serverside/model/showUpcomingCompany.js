let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('UpcomingCompany',new Schema({

    company : {type:Object,required:true}
    
},{
    collection:'studentSideUpcomingCompanies'
}));