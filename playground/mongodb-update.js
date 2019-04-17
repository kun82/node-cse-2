
//call mongoclient
//const MongoClient =require('mongodb').MongoClient
const {MongoClient, ObjectID} =require('mongodb') //equal code as above

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if (err){
        console.log('Unable to connect to MongoDB Server')
    }//else
    console.log('Connected to MongoDB Server')
    const db = client.db('TodoApp')
    
/*     // findOneAndUpdate
    //https://docs.mongodb.com/manual/reference/operator/update-field/index.html
    // target Todos 
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID("5cb5438328f16a2748363849")
    },{
        $set:{// Sets the value(true) of a field in a document
            completed: true 
        }
    },{ // When false, returns the updated document rather than the original.
            returnOriginal: false
    }).then((result)=>{
        console.log(result)
    }) */

// findOneAndUpdate - change name & increment age
    db.collection('Users').findOneAndUpdate({
        _id: 333 //find the desired ID
    },{
        $set:{// Sets the name of a field in a document
            name: 'SK TAN'
        }, 
        $inc:{// increment +1 valueof a field in a document
            age: 1
            }
        
    },{ // When false, returns the updated document rather than the original.
            returnOriginal: false
    }).then((result)=>{
        console.log(result)
    })






    //db.close()
})

