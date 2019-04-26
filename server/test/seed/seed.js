//SEED

const {ObjectID}= require('mongodb')
const jwt = require('jsonwebtoken')
const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

//create two user id
const userOneId = new ObjectID()
const userTwoId = new ObjectID()
//create user Array as SEED Data
const users = [{//with auth token
    _id:userOneId,
    email: 'kun@test.com' ,
    password: 'userOnePass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id:userOneId, access:'auth'},'abc123').toString()
    }]
},{//withOUT auth token
    _id: userTwoId,
    email: 'kun2@test.com' ,
    password: 'userTwoPass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id:userTwoId, access:'auth'},'abc123').toString()
    }]
    
}]

//setup todos array object 
const todos = [{
    _id: new ObjectID(),
    text:'First test todo',
    _creator:userOneId
},{
    _id: new ObjectID(),
    text:'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId

}]

//define new function 'populateTodos'
const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{// change 'remove' to deleteMany';empty Todos
        return Todo.insertMany(todos) //insert all todos array object
    }).then(()=>done())
}

//define new function 'populateUsers'
const populateUsers = (done) =>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save() //save userOne
        var userTwo = new User(users[1]).save() //save userTwo
        // pass in userone and two(array) and wait for both to save successfully
        return Promise.all ([userOne,userTwo]).then(()=>done())
        })
}
//exports
module.exports={todos:todos,populateTodos:populateTodos
            ,users:users,populateUsers:populateUsers}