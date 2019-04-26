//import
require('./config/config');

const _ =require('lodash')
const express = require('express')
//bodyParser - take JSON convert into object 
const bodyParser = require('body-parser')  
const {ObjectID} = require('mongodb')


var {mongoose} = require ('./db/mongoose')
var {Todo}= require ('./models/todo')
var {User}= require ('./models/user')
var {authenticate}=require('./middleware/authenticate')


var app = express()
//For Heroku 
var port = process.env.PORT||3000

//configure middleware
app.use(bodyParser.json())

//creating route(url, callback) & add authenticate middleware for private route
app.post('/todos',authenticate,(req,res)=>{
    //use POSTMAN and Post JSON and display on console.log
    console.log(req.body)
    var todo = new Todo({
        text: req.body.text, //access the req.body.text property
        _creator:req.user._id//access the user id (creator) from  todo.js

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


//GET & add authenticate middleware for private route
app.get('/todos',authenticate,(req,res)=>{
    Todo.find({//access & find the user id (creator) - reference from todo.js
        _creator:req.user._id
    }).then((todos)=>{
        res.send({todos})
    },(err)=>{
        res.status(400).send(err)
    })
})

//GET /TODOS/id parameters & add authenticate middleware for private route
app.get('/todos/:id',authenticate, (req,res)=>{
    var id = req.params.id
   
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Todo.findOne({
        _id:id,
        _creator:req.user._id // user that is currently loggin
    }).then((todo)=>{
        if(!todo){// if no match
            return res.status(404).send()
        }
        res.send({todo:todo}) // if success, send respond object propety{}
    }).catch((err)=>{
        return res.status(400).send()
    })
})

//DELETE /TODOS/id parameters  & add authenticate middleware for private route
app.delete('/todos/:id',authenticate,(req,res)=>{
    //get the ID
    var id = req.params.id
    //vadlidate the ID, if not valid return 404
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    //remove todo by id 
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id // user that is currently logged in
    }).then((todo)=>{
        if(!todo){//if no todo send 404
            return res.status(404).send()
        } //if avaliable send doc back 200 
        res.send({todo});
    }).catch((err)=>{  //error 400 with empty body
         res.status(400).send(err)
    })
})

//PATCH & add authenticate middleware for private route
app.patch('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id
    //pull off the existing property "text" & "completed" for editing
    var body = _.pick(req.body,['text','completed'])  
        
    //vadlidate the ID property, if not valid return 404
        if(!ObjectID.isValid(id)){
            return res.status(404).send()
        }
    //vadlidate the completed property, if it a boolean and valid
        if(_.isBoolean(body.completed) && body.completed){
            body.completedAt= new Date().getTime() // get timestamp for js
        }else{ //set the following
            body.completed = false
            body.completedAt = null
        }
        //  set to body, return orginal to true
        Todo.findOneAndUpdate({
            _id:id,
            _creator:req.user._id // user that is currently logged in
            },
            {$set:body},{new: true}).then((todo)=>{
                if(!todo){
                    return res.status(404).send()
                }
                res.send({todo:todo}) //respond todo parameter
            }).catch((err)=>{
                res.status(400).send()
            })
})

//POST /users
app.post('/users',(req,res)=>{
    var body =_.pick(req.body,['email','password']) //2 properties
    var user = new User(body)

    //save user after validation
    user.save().then(()=>{
        return user.generateAuthToken()  //generateAuthToken from user
    }).then((token)=>{
        res.header('x-auth',token).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

//PRIVATE ROUTE AUTH MIDDLEWARE to make it private (with authenticate from middleware)
app.get('/users/me',authenticate,(req,res)=>{
    //respond req.user object
    res.send(req.user)
})

//POST /users/login {email, password}
app.post ('/users/login',(req,res)=>{
    var body =_.pick(req.body,['email','password']) //2 properties

    //verify user email exist
    User.findByCredentials(body.email, body.password).then((user)=>{
        //return the called generateAuthToken for new (token)
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user)
        })
    }).catch((err)=>{
        res.status(400).send() // if user not exist
    })
    
})

// LOGGING OUT DELETE users me token
// refer to authenticate.js which store req.user & req.token
app.delete('/users/me/token',authenticate,(req,res)=>{ 
    //refer to removetoken method in user.js
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send()
    },()=>{// if error send status 400
        res.status(400).send() 
    })
})


app.listen (port,()=>{
    console.log (`Connect on port: ${port}`)
})

module.exports={app}