
//call mongoclient
//const MongoClient =require('mongodb').MongoClient
const {MongoClient, ObjectID} =require('mongodb') //equal code as above



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err){
        console.log('Unable to connect to MongoDB Server')
    }//else
    console.log('Connected to MongoDB Server')
    const db = client.db('TodoApp') // access TodoApp DB

/*     db.collection('Todos').find({
       // _id: new ObjectID('5cb57381a335efce0e26a316') // to find with _id
        
    }).toArray().then((docs)=>{
        //success case
        console.log('Todos')
        console.log(JSON.stringify(docs,undefined,2))
    },(err)=>{
        console.log('Unable to fetch todos', err)
    }) */
 
    db.collection('Users').find({name:'SK'}).toArray().then((results)=>{
        console.log('Users')
        console.log(JSON.stringify(results,undefined,2))
    },(err)=>{
        console.log('Unable to fetch Users', err)
    })
})