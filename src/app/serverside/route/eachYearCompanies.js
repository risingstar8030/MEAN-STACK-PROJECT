let express =require('express');
let router = express.Router();
let Company = require('../model/company');
let YearlyCompanies = require('../model/eachyearcompanies');
let Student = require('../model/student');

router.post('/getCompanies/:year',async(req,res)=>{

    const year1 =parseInt( req.params.year);
    const year2 = year1 + 1;

    const searchAcademicYear = await YearlyCompanies.findOne({
        $and :[{year1:year1},{year2:year2}]
    })
    .populate('companiesVisited',' _id companyName date ctc website showPlacedStudents')

    res.status(200).json({
        title:"Success",
        result:searchAcademicYear.companiesVisited
    });
    
});


router.post('/getParticularCompany/:year',async(req,res)=>{

    const year1 =parseInt( req.params.year);
    const year2 = year1 + 1;

    const searchAcademicYear = await YearlyCompanies.findOne({
        $and :[{year1:year1},{year2:year2}]
    })
    .populate({
        path:'companiesVisited',
        select:'studentsPlaced',
        populate:{
            path:'studentsPlaced',
            select:{'firstName':1,'lastName':1,'branch':1,'email':1}
        }
    });

    const result = searchAcademicYear.companiesVisited
    .find((item)=>{
        if(item._id == req.body.id){
            return item;
        }
    });

    res.status(200).json({
        title:"Success",
        result:result.studentsPlaced
    });
    
});

router.post('/allPlacedStudents/:year',async(req,res)=>{

    const year1 =parseInt( req.params.year);
    const year2 = year1 + 1;

    const searchAcademicYear = await YearlyCompanies.findOne({
        $and :[{year1:year1},{year2:year2}]
    })
    .populate({
        path:'companiesVisited',
        select:{'studentsPlaced':1,'_id':0},
        populate:{
            path:'studentsPlaced',
            select:{'firstName':1,'lastName':1,'branch':1,'email':1,'company':1},
            populate:{
                path:'company',
                select:{'companyName':1,'ctc':1,'_id':0}
            }
        }
    });

    if(req.body.branch != "all"){

    const arrayOfStudents = [];

    for(let i=0;i<searchAcademicYear.companiesVisited.length;i++){

        for(let j=0;j<searchAcademicYear.companiesVisited[i].studentsPlaced.length
            ;j++)
        {
            if(searchAcademicYear.companiesVisited[i].studentsPlaced[j].branch==req.body.branch){
                arrayOfStudents.push(searchAcademicYear.companiesVisited[i].studentsPlaced[j]);
            }
        }
    }

        res.status(200).json({
            title:"Success",
            result:arrayOfStudents
        });
    }
    else{

        const arrayOfStudents = [];

        for(let i=0;i<searchAcademicYear.companiesVisited.length;i++){
    
            for(let j=0;j<searchAcademicYear.companiesVisited[i].studentsPlaced.length
                ;j++)
            {
             arrayOfStudents.push(searchAcademicYear.companiesVisited[i].studentsPlaced[j]);
            }
        }

        res.status(200).json({
            title:"Success",
            result:arrayOfStudents
        });
    }

});


router.get('/allPlacedStudents/:year',async(req,res)=>{

    const year1 =parseInt( req.params.year);
    const year2 = year1 + 1;

    const searchAcademicYear = await YearlyCompanies.findOne({
        $and :[{year1:year1},{year2:year2}]
    })
    .populate({
        path:'companiesVisited',
        select:{'studentsPlaced':1,'_id':0},
        populate:{
            path:'studentsPlaced',
            select:{'firstName':1,'lastName':1,'branch':1},
        }
    });

    if(!searchAcademicYear){
        res.status(500).json({
            title:"No such  academin year found",
        });
    }

    const arrayOfStudents = [];

    for(let i=0;i<searchAcademicYear.companiesVisited.length;i++){

        for(let j=0;j<searchAcademicYear.companiesVisited[i].studentsPlaced.length
            ;j++)
        {
         arrayOfStudents.push(searchAcademicYear.companiesVisited[i].studentsPlaced[j]);
        }
    }

    res.status(200).json({
        title:"Success",
        result:arrayOfStudents
    });

});

module.exports = router;