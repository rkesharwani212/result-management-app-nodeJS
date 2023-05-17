const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const teacherRouter = require("./routes/teacher");
const studentRouter = require("./routes/student");
const authRouter = require("./routes/auth");
const app = express();

mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || 'mongodb://localhost/StudentResult');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'/public/')));
app.use('/css',express.static(path.join(__dirname,'/node_modules/bootstrap/dist/css')));
app.use(session({
    secret: "secret",
    cookie: {maxAge:10000},
    resave: false,
    saveUninitialized: false
}))
app.use(flash());

app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);
app.use('/auth',authRouter);
const port = process.env.PORT || 8080;
app.listen(port,()=>{console.log('listening to port 8080')})