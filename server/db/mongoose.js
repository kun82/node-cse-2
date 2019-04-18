var mongoose = require ('mongoose')

// set built-in promise
mongoose.Promise=global.Promise
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp') //connecto TodoApp Database

module.exports ={
    mongoose:mongoose
}