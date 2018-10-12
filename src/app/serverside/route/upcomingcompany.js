let express =require('express');
let router = express.Router();
let Company = require('../model/company');
let Student = require('../model/student');
let YearlyCompanies = require('../model/eachyearcompanies');

router.post('/addCompany/:year',async(req,res) =>{

    const year1 =parseInt( req.params.year);
    const year2 = year1 + 1;

    let company = new Company({
        date : req.body.date,
        day:req.body.day,
        time:req.body.time,
        companyName:req.body.companyName,
        ctc : req.body.ctc,
        website:req.body.website,
        comp:req.body.comp,
        it:req.body.it,
        entc:req.body.entc,
        activity1:req.body.activity1,
        activity2:req.body.activity2,
        activity3:req.body.activity3,
        venue1:req.body.venue1,
        venue2:req.body.venue2,
        venue3:req.body.venue3,
        skills:req.body.skills,
        showCompanyToStudents:req.body.showCompanyToStudents,
        showPlacedStudents:false,
        criteria : req.body.criteria,
        backlog:req.body.backlog,
        academicYear:year1+"-"+year2
    });

    const result = await company.save();

    if(!result){
        return res.status(500).json({
            title : 'Company Not Saved'
        });   
    }


    const searchAcademicYear = await YearlyCompanies.findOne({
        $and :[{year1:year1},{year2:year2}]
    });

    if(!searchAcademicYear){
        let addAcademicYear = new YearlyCompanies({
            year1 : year1,
            year2:year2
        });
        const yearAdded = await addAcademicYear.save();

        yearAdded.companiesVisited.push(result);
        const addedCompany = await yearAdded.save();
    }

    searchAcademicYear.companiesVisited.push(result);
    const addCompany = await searchAcademicYear.save();
    
    res.status(201).json({
        title:'Company has been added',
        company:result,
        academicYear:addCompany
    });

});

router.get('/getCompanyList/:year', async(req,res)=>{

    const year1 =parseInt( req.params.year);
    const year2 = year1 + 1;
   
    const searchAcademicYear = await YearlyCompanies.findOne({
        $and :[{year1:year1},{year2:year2}]
    })
    .populate('companiesVisited','-studentsPlaced')

    res.status(200).json({
        title:"Success",
        result:searchAcademicYear.companiesVisited
    });

});

router.put('/updateCompany/:id',async(req,res)=>{

  const updatedCompany = await Company.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            date : req.body.date,
            day:req.body.day,
            time:req.body.time,
            companyName:req.body.companyName,
            ctc : req.body.ctc,
            website:req.body.website,
            comp:req.body.comp,
            it:req.body.it,
            entc:req.body.entc,
            activity1:req.body.activity1,
            activity2:req.body.activity2,
            activity3:req.body.activity3,
            venue1:req.body.venue1,
            venue2:req.body.venue2,
            venue3:req.body.venue3,
            skills:req.body.skills,
            showCompanyToStudents:req.body.showCompanyToStudents,
            showPlacedStudents:false,
            criteria : req.body.criteria,
            backlog:req.body.backlog
        }
    },{new:true});

    if(!updatedCompany){
        return res.status(500).json({
            title : 'No Company Found'
        });    
    }

    res.status(201).json({
        title : 'Updated Successfully',
        company:updatedCompany
    });
});

router.put('/updateShowPlacedStudents/:id',async(req,res)=>{

    const updatedCompany = await Company.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            showPlacedStudents:req.body.showPlacedStudents
        }
    },{new:true})
    .populate({
        path:'studentsPlaced',
        select:{'firstName':1,'lastName':1,'branch':1,'_id':0},
    })
    .select('companyName studentsPlaced showPlacedStudents -_id');


    if(!updatedCompany){
        return res.status(500).json({
            title : 'No Company Found'
        });    
    }

    res.status(201).json({
        title : 'Updated Successfully',
        company:updatedCompany
    });
});

router.put('/updateShowCompany/:id',async(req,res)=>{

    const updatedCompany = await Company.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            showCompanyToStudents:req.body.showCompanyToStudents
        }
    },{new:true})
    .select(' -_id -studentsPlaced -showPlacedStudents -academicYear');


    if(!updatedCompany){
        return res.status(500).json({
            title : 'No Company Found'
        });    
    }

    res.status(201).json({
        title : 'Updated Successfully',
        company:updatedCompany
    });

});

router.delete('/deleteCompany/:id',async(req,res)=>{

    const result = await Company.remove({_id:req.params.id});
                
    res.status(201).json({
        title : 'Deleted Successfully',
        result:result,  
    });

   
});

router.post('/addPlacedStudent/:studentID',async(req,res)=>{

    const student = await Student.findById({_id:req.params.studentID});

    if(!student){
        return res.status(500).json({
            title : 'No Student Found'
        });
    }

    const company = await Company.findById({_id:req.body._id});

    if(!company){
        return res.status(500).json({
            title : 'No Company Found'
        });
    }

    student.placed = true;
    student.company = company;
    const placedStudent = await student.save();

    company.studentsPlaced.push(placedStudent);
    const result = await company.save();

    res.status(201).json({
        title : 'Student has been added placed company',
        result:result,
        student:placedStudent
    });
});

router.get('/getCompanyDetails/:id',async(req,res)=>{

    const company = await Company.findById({_id:req.params.id});

    if(!company){
        res.status(500).json({
            title:'No company fpound'
        });
    }

    res.status(200).json({
        title:'Company Found',
        company : company
    });
    
});



module.exports = router;