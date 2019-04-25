var mongoose=require('mongoose')

//create mongoose model property
var Todo = mongoose.model('Todo',{
    //define object property/type
    text:{
        type:String,
        required:true,//add validator to ensure text is added
        minlength:1,
        trim: true  //remove leading and trailing space
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }
})

// exports out to allow other to use Todo function
module.exports={Todo:Todo}