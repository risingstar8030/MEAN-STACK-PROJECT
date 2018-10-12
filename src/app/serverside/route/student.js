var express =require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Student = require('../model/student');
var jwt = require('jsonwebtoken');
var Department = require('../model/dept');
let PlacedStudents = require('../model/showPlacedStudents');
let UpcomingCompany = require('../model/showUpcomingCompany');

router.post('/signup',async(req,res)=>{

    const student =await Student.findOne({$and:[
        {regid:req.body.regid},{admyear:req.body.admyear},
        {branch:req.body.branch},
    ]});

    if(!student){
        return  res.status(500).json({
            title:'No student found',
        });
    }

    const dept = await Department.findOne({$and:[
        {branch:student.branch},
        {year :student.admyear}
    ]});


    if(!dept){
        return  res.status(500).json({
            title:'No department found',
        });
    }

   if(student.inserted === 0){

     student.inserted=1;
     student.newpassword=bcrypt.hashSync(req.body.newpassword,10);
     const user =await student.save();  

    dept.students.push(user);
    const result = await dept.save();

    res.status(201).json({
        title:'success',
        student:user,
        dept:dept
    });
    }
    else{
        res.status(201).json({
            title:'student has registered already',         
        });
    }
});


router.post('/signin',async(req,res)=>{

   const student= await Student.findOne({"regid":req.body.regid});

   if(!student){
    return res.status(500).json({
        title :"No user found",
        error :{message:"Invalid login credentials"}
    });
   }

   if(!bcrypt.compareSync(req.body.newpassword,student.newpassword)){
    return res.status(401).json({
        title :"Login Failed",
        error :{message:"Invalid login credentials"}
    });
   }

   let token = jwt.sign({student:student},'secret',{expiresIn:900});
   return res.status(200).json({
       message :"Successfully Loged In",
       token:token,
       userId: student._id, 
   }); 

});

router.post('/getStudents',async(req,res)=>{

    const dept = await Department.findOne({$and:[
        {branch:req.body.branch},
        {year :req.body.year}
    ]})
    .populate('students','_id firstName lastName email branch admyear placed');

    if(!dept){
        return  res.status(500).json({
            title:'No branch found',
        });
    }

    return res.status(200).json({
        title :"Branch has been found",
        students : dept.students
    });
});


router.post('/studentDetail/:id',async(req,res)=>{

    const student = await Student.findById({_id:req.params.id})
    .populate('company','companyName -_id');

    if(!student){
        return  res.status(500).json({
            title:'No student found',
        });
    }

    return res.status(200).json({
        title :"Student found",
        student : student,
        
    });

});

router.post('/showCompany',async(req,res)=>{

    let company = new PlacedStudents({
        companyName : req.body.companyName,
        students : req.body.studentsPlaced
    });

    const result = await company.save();

    res.status(201).json({
        title : 'Placed students shown',
        result : result
    });

});

router.post('/removeCompany',async(req,res)=>{

    const result = await PlacedStudents.remove({companyName:req.body.companyName});

    res.status(201).json({
        title : 'Removed List of placed students',
        result : result
    });

});

router.post('/showUpcomingCompany',async(req,res)=>{

    let company = new UpcomingCompany({
        company:req.body
    });

    const result = await company.save();

    res.status(201).json({
        title : 'Upcoming company shown',
        result : result
    });

});


router.post('/removeUpcomingCompany',async(req,res)=>{

    const result = await UpcomingCompany.remove({'company.companyName':req.body.companyName});

    res.status(201).json({
        title : 'Removed  Upcoming Company',
        result : result
    });

});

router.get('/listOfPlacedStudents',async(req,res)=>{

    const result = await PlacedStudents.find().exec();

    if(!result){
        res.status(200).json({
            title : 'No Company found',
        });
    }

    res.status(200).json({
        title : 'List of placed students',
        result : result
    });

});

router.get('/listOfUpcomingCompanies',async(req,res)=>{

    const result = await UpcomingCompany.find().exec();

    if(!result){
        res.status(200).json({
            title : 'No Company found',
        });
    }

    res.status(200).json({
        title : 'List of Upcoming Companies',
        result : result
    });

});


module.exports = router;