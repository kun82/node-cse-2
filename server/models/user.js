const mongoose=require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ =require ('lodash')

var UserSchema = new mongoose.Schema({
//define object property/type
//Object Email
    email:{
        type:String,
        required:true, //ensure email has to be key in
        trim: true,  //remove leading and trailing space
        minlength:1,
        unique: true, // ensure email is unique, no duplicate
        validate: { //setup moongoose custom validation for email
            validator: validator.isEmail, // *need to install npm "validator" module   
            message:'{VALUE} is not an valid email'      
        }
    },
//Object password
    password:
    {
        type:String,
        required:true, //ensure email has to be key in
        minlength:6,
    },
//Object tokens array
    tokens:[{ //setup tokens property
        access:{
            type:String,
            required:true, //ensure email has to be key in
        },
        token:{
            type:String,
            required:true, //ensure email has to be key in
        }
    }]
})

UserSchema.methods.toJSON = function(){
    var user = this
    var userObject = user.toObject()
    
    //return id and email
    return _.pick(userObject,['_id','email'])


}

UserSchema.methods.generateAuthToken = function(){
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()

    user.tokens.push({access,token})
    
    return user.save().then(()=>{
        return token
    })

}

var User = mongoose.model('User',UserSchema)


// exports out to allow other to use User function
module.exports={User}