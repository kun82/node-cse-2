
//call mongoclient
//const MongoClient =require('mongodb').MongoClient
const {MongoClient, ObjectID} =require('mongodb') //equal code as above

// var obj = new ObjectID()//New instance Obj
// console.log (obj)

/* //destructure {object} 
var user = {name:'Sk',age:30}
var {name} = user
console.log(name) */

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err){
        console.log('Unable to connect to MongoDB Server')
    }//else
    console.log('Connected to MongoDB Server')
   
    /* const db = client.db('TodoApp')
    db.collection('Todos').insertOne({
        text:'Something to do',
        completed: false
    },(err,result)=>{
        if(err){
        return console.log('Unable to insert todo',err) //return to stop this function with error msg
        }//else
        console.log(JSON.stringify(result.ops,undefined,2))

    }) */
    
    //insert new doc into Users(name,age, location) in 'TodoApp' db collection
/*     const db = client.db('TodoApp')
    //collecition method
    db.collection('Users').insertOne({
        name:'SK',
        age: 30,
        location:'SGNTU'
    },(err,result)=>{
        if(err){
        return console.log('Unable to insert User',err) //return to stop this function with error msg
        }//else display 
        console.log(JSON.stringify(result.ops[0]._id))//print id.
    }) */

    client.close() //close connection

})