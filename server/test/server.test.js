const request = require ('supertest')
const expect = require('expect')

const {app} = require('./../server')
const {Todo} =require ('./../models/todo')

//setup todos array object 
const todos = [{
    text:'First test todo'
},{
    text:'Second test todo'
}]

beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{//empty Todos
        Todo.insertMany(todos) //insert todos array object
    }).then(()=>done())
})

//describe block name POST /todos
describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text = "test todo text"
        request(app) 
        .post('/todos') //set up post request
        .send({text:text})  //supertest library do the conversion into JSON
        .expect(200)  // expect no error
        .expect((res)=>{
            // expect return respond body.text to be same text string above
            expect(res.body.text).toBe(text)  
        })
        .end((err,res)=>{  //check what is stored in mongodb collection
            if(err){
                return done(err)//return stop function execution 
            }
            // to verfiy in DB if the text is add
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1) //expect todos has 1 item
                expect(todos[0].text).toBe(text) //expect this 1 item has test property
                done()
            }).catch((err)=>done(err)) //catch error
        })
    })

// 2nd test case
    it('should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/todos')
        .send({}) //pass in empty object
        .expect(400) // expect error
        .end((err,res)=>{
            if(err){
                return done(err)//stop function execution
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2) //should be no data
                done()
            }).catch((err)=>done(err)) //catch error
        })
    })
})

describe('GET /todos',()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
})