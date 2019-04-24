//import from user.js
var{User} = require('./../models/user')

var authenticate = (req,res,next)=>{
    //fetch the header x-auth
        var token = req.header('x-auth')
        
        User.findByToken(token).then((user)=>{
            if(!user){ //if there is no or no match user
                return Promise.reject() // this will stop the function and execute .catch()
            }
            req.user = user
            req.token = token
            next()
        }).catch((err)=>{
            res.status(401).send()
        })
    }
    

    //export
    module.exports = {authenticate:authenticate}