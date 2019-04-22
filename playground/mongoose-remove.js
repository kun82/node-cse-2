const {ObjectID} = require('mongodb')


const {mongoose} = require ('./../server/db/mongoose.js')
const {Todo} = require ('./../server/models/todo.js')
const {User} = require ('./../server/models/user.js')

/*
//remove everything in the database
Todo.remove({}).then((result)=>{
    console.log(result)// display result
}) */

//Todo.findOneAndRemove
Todo.findOneAndRemove({_id:'5cbdd360e152dba6e64b05e2'}).then((todo)=>{
    console.log(todo)
})


/* 
//Todo.findByIdAndRemove
Todo.findByIdAndRemove('5cbdd360e152dba6e64b05e2').then((todo)=>{
    console.log(todo)
}) */