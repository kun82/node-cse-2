var mongoose = require ('mongoose')

// set built-in promise
mongoose.Promise=global.Promise
mongoose.connect(process.env.MONGODB_URI) 

module.exports ={
    mongoose:mongoose
}
//https://intense-wildwood-22584.herokuapp.com/

