require('express-async-errors');
let express =require('express');
let bodyparser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();

let studentRoutes = require('./route/student');
let messageRoutes = require('./route/message');
let adminRoutes = require('./route/admin');
let companyRoutes = require('./route/upcomingcompany');
let yearlyCompaniesRoutes = require('./route/eachYearCompanies');

mongoose.connect('mongodb://localhost:27017/dbms',{
  useMongoClient:true,
});

mongoose.connection.on('connected',()=>{
    console.log('mongodb connected');
})

mongoose.connection.on('error',(err)=>{
    console.log(err);
})

app.use(cors());
app.use(bodyparser.json());
app.use('/admin',adminRoutes);
app.use('/student',studentRoutes);
app.use('/message',messageRoutes);
app.use('/company',companyRoutes);
app.use('/yearlyCompanies',yearlyCompaniesRoutes);
app.get('/', function (req, res, next) {
    res.render('index');
});

app.use(function(err,req,res,next){
    res.status(500).send(err);
});

const port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log("server started at port "+port);
})

