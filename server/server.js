var express = require('express')
var {ObjectID} = require('mongodb')

//bodyParser - take JSON convert into object 
var bodyParser = require('body-parser')  

var {mongoose} = require ('./db/mongoose')
var {Todo}= require ('./models/todo')
var {User}= require ('./models/user')


var app = express()
//For Heroku 
var port = process.env.PORT||3000

//configure middleware
app.use(bodyParser.json())

//creating route(url, callback)
app.post('/todos',(req,res)=>{
    //use POSTMAN and Post JSON and display on console.log
    console.log(req.body)
    var todo = new Todo({
        text: req.body.text, //access the req.body.text property
        //completed:req.body.completed,
        //completedAt:req.body.completedAt
    })
    //save into database
    todo.save().then((result)=>{
        res.send(result) //return(respond) by sending the result
    },(err)=>{
        res.status(400).send(err) //return (respond) by sending the error
    })
})


//GET
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    },(err)=>{
        res.status(400).send(err)
    })
})

//GET /TODOS/id parameters
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id
   
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){// if no match
            return res.status(400).send()
        }// if success, send respond object propety{}
        res.send({todo}) 
    }).catch((err)=>{

    })
})

app.listen (port,()=>{
    console.log (`Connect on port: ${port}`)
})

module.exports={app}