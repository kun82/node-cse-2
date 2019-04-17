var express = require('express')

//bodyParser - take JSON convert into object 
var bodyParser = require('body-parser')  

var {mongoose} = require ('./db/mongoose')
var {Todo}= require ('./models/todo')
var {User}= require ('./models/user')

var app = express()

//configure middleware
app.use(bodyParser.json())

//creating route(url, callback)
app.post('/todos',(req,res)=>{
    //use POSTMAN and Post JSON and display on console.log
    console.log(req.body)
    var todo = new Todo({
        text: req.body.text, //access the req.body.text property
        completed:req.body.completed,
        completedAt:req.body.completedAt

    })
    //save into database
    todo.save().then((result)=>{
        res.send(result) //return(respond) by sending the result
    },(err)=>{
        res.send(err) //return (respond) by sending the error
    })

})

app.listen (3000,()=>{
    console.log ('Connect on port: 3000')
})