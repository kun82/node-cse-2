var mongoose=require('mongoose')


// Create new Mongoose User Model Property(email- required & trim -set type -set min length)
var User = mongoose.model('User',{
    //define object property/type
    email:{
        type:String,
        required:true,
        trim: true,  //remove leading and trailing space
        minlength:1
    }
})


// exports out to allow other to use User function
module.exports={User}