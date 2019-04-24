const mongoose=require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ =require ('lodash')
const bcrypt = require ('bcryptjs')

//schema stored all the property
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

//CREATING METHODS
// methods determine what is send back to client
UserSchema.methods.toJSON = function(){
    var user = this
    var userObject = user.toObject() // user.toObject takes moongoose varible user
    //pick 2 (without tokens) and return properties - id & email
    //to access token array use example 'tokens[0].access'
    return _.pick(userObject,['_id','email'])
}

//Create generateAuthToken method adds token on individual user docu, save it and return back to the user
UserSchema.methods.generateAuthToken = function(){
    var user = this //manipulating user
    var access = 'auth'
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()
    // push new objects -access & tokens
    user.tokens.push({access,token})
    // save the changes (chaining)
    return user.save().then(()=>{
        return token
    })
}

//create findByToken statics method, function get arugment token.
UserSchema.statics.findByToken = function(token){
    var User = this
    //undefined variable because jwt.verify () will throw error if its not match or whateer
    var decoded;

    try{
        decoded = jwt.verify(token,'abc123')
    }catch(err){ // if error, this promise will return reject function 
        //return new Promise((resolve,reject)=>{ reject()});
        return Promise.reject() // alternative as above
    }
    // for success decode case
    return User.findOne({
        '_id': decoded._id,// it will get the _id property (not from tokens)
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

//before 'save' to DB
UserSchema.pre('save', function(next){
    var user = this
    if (user.isModified('password')){// if password is modified
        // generate salt 
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password, salt,(err,hash)=>{
                user.password = hash // update password with hashed
                next()
            })
        })
    }else { // if password NOT modified
        next()
    }

    
})

var User = mongoose.model('User',UserSchema)


// exports out to allow other to use User function
module.exports={User}