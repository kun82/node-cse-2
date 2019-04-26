var env = process.env.NODE_ENV || 'development'

if (env=== 'development'|| env === 'test'){
    // require config.json file
    var config = require('./config.json')
    // console.log(config)
    var envConfig = config[env]

    //loop for each
    Object.keys(envConfig).forEach((key)=>{
        process.env[key] = envConfig[key]
    })
}



/*
// done in config.json 
if (env ==='development'){
    process.env.PORT=3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
}else if (env==='test'){
    process.env.PORT =3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
 */