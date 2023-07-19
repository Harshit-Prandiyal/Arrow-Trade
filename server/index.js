const express = require('express');
const app = express();
const PORT = 8000;
const apiRoute = require('./routes/portfolio');
//Midddleware / plugin
// app.use(express.urlencoded({extended:false}));


app.use(express.json());
app.use('/api',apiRoute);
//app.route('/users')
// .get((req,res)=>{
//     return res.json(users);
// } )
// .post((req,res)=>{
    
//     return res.json({status : "Pending"});
// } )
// .put((req,res)=>{
    
//     return res.json({status : "Pending"});
// } );

app.listen(PORT,()=>{console.log('server started');})