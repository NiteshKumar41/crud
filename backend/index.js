const express = require('express');
const mongoose = require('./db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes.js');
const Employee = require('./models/employee.js');

const app = express();

// const routes = require('./routes/routes.js');
        // app.use('/employee',routes);
// app.use(bodyParser.json());

app.use(express.json());

app.use(cors({origin:'http://localhost:4200'}));

app.listen(3000,()=>{
    console.log('server started');
})

const objectId = require('mongoose').Types.ObjectId;

//API GET POST PUT DELETE

//GET
app.get('/employee',(req,res) =>{
 //single api data using id

//  if(objectId.isValid(req.params.id)){
//     Employee.findById(req.params.id,(err,doc)=>{
//         if(err) throw err;

//         res.send(doc);

//         console.log(doc.name);
//     })
//  }
//  else{

//  }


    Employee.find((err,doc)=>{
        if(err) throw err;
        res.send(doc);
    })
});


//POST

app.post('/employee',(req,res)=>{

    let emp = new Employee ({
        name: req.body.name, 
        position: req.body.position,
        dept: req.body.dept
    });
    emp.save((err,doc)=>{
        if(err) throw err;
        res.send(doc);
        
    })
})


//DELETE Api

app.delete('/employee/:id',(req,res)=>{
    if(objectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(err) throw err;
            res.send(doc);
        })
    }
    else{
        console.log('err while deleteing the user data');
    }
})

//Put Api

app.put('/employee/:id',(req,res)=>{
    if(objectId.isValid(req.params.id)){
        let emp = {
            name: req.body.name, 
            position: req.body.position,
            dept: req.body.dept
        };
            Employee.findByIdAndUpdate(req.params.id,{$set:emp},(err,doc)=>{
                if(err) throw err;
                 res.send(doc);
            })
    }
    else{

    }
})