const express = require('express');
const StudentResult = require('./../models/student_result');
const router = express.Router();

router.get('/',async(req,res)=>{
    const results = await StudentResult.find();
    res.render('teacher',{results:results,message: req.flash('message')});
})

router.get('/new',(req,res)=>{
    res.render('new_result',{result: new StudentResult(), message: ""});
})
router.get('/edit/:id',async (req,res)=>{
    const result = await StudentResult.findById(req.params.id)
    res.render('edit_result',{result: result, message: ""})
})
router.post('/',async (req,res)=>{
    let studentResult = new StudentResult({
        rollno: req.body.rollno,
        name: req.body.name,
        dob: req.body.dob,
        score: req.body.score
    })
    try{
        if(studentResult.dob < new Date()){
            studentResult = await studentResult.save();
            req.flash('message',"Successfully inserted the record");
            res.redirect('/teacher');
        }else{
            req.flash('message',"Please select date before todays date");
            res.render('new_result',{result: studentResult, message: req.flash('message') });
        }
        
    }catch(e){
        res.redirect('/teacher/new',{result: studentResult});
    }
})

router.put('/:id', async (req,res)=>{
    let studentResult = await StudentResult.findById(req.params.id);
    studentResult.rollno =  req.body.rollno;
    studentResult.name = req.body.name;
    studentResult.dob = req.body.dob;
    studentResult.score = req.body.score;
    try{
        if(studentResult.dob < new Date()){
            studentResult = await studentResult.save();
            req.flash('message',"Successfully updated the record")
            res.redirect('/teacher');
        }else{
            req.flash('message',"Please select date before todays date");
            res.render('edit_result',{result: studentResult, message: req.flash('message') });
        }
    }catch(e){
        res.redirect('/teacher/edit',{result: studentResult});
    }
    
})

router.delete('/:id', async (req,res)=>{
    await StudentResult.findByIdAndDelete(req.params.id);
    req.flash('message',"Successfully deleted the record")
    res.redirect("/teacher");
})

module.exports = router
