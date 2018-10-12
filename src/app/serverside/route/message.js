let express = require('express');
let router = express.Router();
let Student = require('../model/student');
let Message = require('../model/message');

router.get('/', async(req,res)=>{

    const result = await Message.find()
    .populate('student','firstName lastName regid');

    res.status(200).json({
        message : 'success',
        obj:result
    });
    
});

router.post('/:id',async(req,res)=>{

    let message = new Message({
        content:req.body.content,
        student:req.params.id
    });
    const result = await message.save();

    const student = await Student.findById({_id:req.params.id});

    student.messages.push(result);
    const addedMessage = await student.save();

    res.status(201).json({
        message:'Saved Message',
        obj:result,
    });
});

router.delete('/:id',async(req,res)=>{

   const result = await Message.remove({_id:req.params.id});

    res.status(200).json({
        message:"message deleted",
        obj:result
    });
});


module.exports =router;