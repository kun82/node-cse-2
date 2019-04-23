const {SHA256} = require('crypto-js') // access to sha256 function module
const jwt = require('jsonwebtoken')

//JASON WEB TOKEN EXAMPLE

var data = {
    id:10
}

var token = jwt.sign(data,'123abc')
console.log(token)

var decoded = jwt.verify(token, '123abc')
console.log('Decoded token: ', decoded)


/* 
//HASH EXAMPLE
var message = 'I am user number 3'
var hash = SHA256(message).toString()

console.log(`Message: ${message}`)
console.log(`Hash Message: ${hash}`)

//create object
var data ={
    id: 4
}
var token = {
    data:data, //get data.id to become token.data
     //json.stringify convert object to string
    hash:SHA256(JSON.stringify(data)+'somesecret').toString()  //token.hash
} 
//token.data.id=5
//token.hash = SHA256(JSON.stringify(token.data)).toString()

//resultHash stored the data from token.data object
var resultHash= SHA256(JSON.stringify(token.data)+'somesecret').toString()

if (resultHash=== token.hash){//if equal
    console.log('Data was not changed or hashed')
}else {
    console.log('Data was changed or hashed. Do not trust it!')
} */