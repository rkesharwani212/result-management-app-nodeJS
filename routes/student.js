const express = require('express');
const StudentResult = require('./../models/student_result');

const router = express.Router();
let student = {
    rollno:"",
    name:""
}
router.get('/',(req,res)=>{
    res.render('student',{student: student, message: req.flash('message')});
})
router.post('/',async(req,res)=>{
    const result = await StudentResult.findOne({rollno: req.body.rollno, name: req.body.name});
    let std = {
        rollno:"",
        name:""
    }
    if(result)
        res.render('result',{result:result});
    else{
        console.log("student does not exist with the given rollno and name");
        req.flash("message","student does not exist with the given rollno and name")
        res.render('student',{student:{rollno:req.body.rollno, name:req.body.name},message: req.flash('message')});
    }
})
module.exports = router;