let express =require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let Admin = require('../model/admin');
let Student = require('../model/student');

var jwt = require('jsonwebtoken');


router.post('/signup',async(req,res)=>{

    let admin =await Admin.findOne({$and:[
        {regid:req.body.regid},
        {department:req.body.department},
    ]});

    if(!admin){
        return res.status(500).json({
            title :"No user found",
            error :{message:"Invalid login credentials"}
        });
    }

     admin.newpassword=bcrypt.hashSync(req.body.newpassword,10);
     const user =await admin.save(); 

    res.status(201).json({
        title:'Admin registered Successfully',
        admin:user,
    });
});


router.post('/signin',async(req,res)=>{

   const admin= await Admin.findOne({"regid":req.body.regid});

   if(!admin){
    return res.status(500).json({
        title :"No user found",
        error :{message:"Invalid login credentials"}
    });
   }

   if(!bcrypt.compareSync(req.body.newpassword,admin.newpassword)){
    return res.status(401).json({
        title :"Login Failed",
        error :{message:"Invalid login credentials"}
    });
   }

   let token = jwt.sign({admin:admin},'secret',{expiresIn:900});
   return res.status(200).json({
       message :"Successfully Loged In",
       token:token,
       userId: admin._id, 
   }); 

});

router.get('/loggedInUser/:id',async(req,res)=>{

    const admin = await Admin.findById({_id:req.params.id})
    .select('-newpassword');

    if(!admin){

        const student = await Student.findById({_id:req.params.id})
        .select('-newpassword -inserted -placed -company -messages -admyear');

        return res.status(200).json({
            title:"Student",
            user : student
        });
    }

    res.status(200).json({
        title:"Admin",
        user : admin
    });

});


module.exports = router;



