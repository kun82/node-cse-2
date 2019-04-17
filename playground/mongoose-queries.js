const {ObjectID} = require('mongodb')


const {mongoose} = require ('./../server/db/mongoose.js')
const {Todo} = require ('./../server/models/todo.js')
const {User} = require ('./../server/models/user.js')

var id= '5cb71da418e8ee1898965036.'

//using ObjectID.isValid for verification
if(!ObjectID.isValid(id)){
    console.log('ID not Valid')
}

/*
 Todo.find({
    _id:id
}).then ((todos)=>{
    console.log('Todos',todos)
}) */
/* 
Todo.findOne({
    _id:id
}).then ((todo)=>{
    console.log('Todo',todo)
})
 */

/*  
Todo.findById(id).then ((todo)=>{
    if(!todo){
        return console.log('id not found')
    }
    console.log('Todo by id',todo)
}).catch((err) => console.log(err)) */

//User.findbyID 5cb6de3daa77182ec04e8005

var user_id = '5cb6de3daa77182ec04e8005'

User.findById(user_id).then((result)=>{
    if(!result){ // if can't find user id
        return console.log('User Id cannot be found')
    } //display success message
    console.log(JSON.stringify(result,undefined,2))
}).catch((err) => console.log(err))