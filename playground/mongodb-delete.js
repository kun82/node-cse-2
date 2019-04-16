
//call mongoclient
//const MongoClient =require('mongodb').MongoClient
const {MongoClient, ObjectID} =require('mongodb') //equal code as above

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err){
        console.log('Unable to connect to MongoDB Server')
    }//else
    console.log('Connected to MongoDB Server')
    const db = client.db('TodoApp')
  
/*     //deleteMany method
    db.collection('Todos').deleteMany({text:'Eat LUNCH'}).then((result)=>{
        console.log(result)
    }) */

/*     //deleteOne method
    db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
        console.log(result)
    }) */

/*     //findOneAndDelete method
    db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
        console.log(result)
    }) */

    //findOneAndDelete method target Users collection using _id
    db.collection('Users').findOneAndDelete({_id:new ObjectID("5cb58b9fa335efce0e26a940")}).then((result)=>{
        console.log(JSON.stringify(result,undefined,2))
    })
     //db.close()
})

