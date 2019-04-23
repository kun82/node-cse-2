const request = require ('supertest')
const expect = require('expect')
const {ObjectID} = require('mongodb')
const {app} = require('./../server')
const {Todo} =require ('./../models/todo')

//setup todos array object 
const todos = [{
    _id: new ObjectID(),
    text:'First test todo'
},{
    _id: new ObjectID(),
    text:'Second test todo',
    completed: true,
    completedAt: 333

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

//5cb71da418e8ee1898965036
describe("GET /todos/:id", ()=>{
    it('should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`) //convert _id type to string
        .expect(200)
        .expect((res)=>{
            expect (res.body.todo.text).toBe(todos[0].text) //expect respond = to db text
        })
        .end(done)
    })

    it('should return 404 if todo not found',(done)=>{
        var hexID = new ObjectID().toHexString() //convert Object id type to string

        request(app)
        .get(`/todos/:${hexID}`) 
        .expect(404)
        .end(done)
    })

    it('should return 404 for non-object ids',(done)=>{
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done)

    })
})

//testing delete
describe ('DELETE /todos:ids',()=>{
     it('should remove a todo by ID',(done)=>{     
         var hexID = todos[1]._id.toHexString()
         request(app)
         .delete(`/todos/${hexID}`) //delete http request
         .expect(200)
         .expect((res)=>{
             expect(res.body.todo._id).toBe(hexID)
         })
         .end((err,res)=>{
             if(err){
                 return done(err)
             }
        //query database findbyID  & expect(null).toNotExist()
        Todo.findById(hexID).then((todo)=>{
            expect(todo).toBeNull();
            done();
        }).catch((err)=>done(err))
        })
     })

     it('should return 404 if todo not found',(done)=>{    
        var hexID = new ObjectID().toHexString() //convert Object id type to string
        request(app)
        .get(`/todos/${hexID}`) 
        .expect(404)
        .end(done)

     }) 

     it('should return 404 if object ID Not Valid',(done)=>{    
        request(app)
        .get(`/todos/123abc`)
        .expect(404)
        .end(done)
    }) 
})

describe('PATCH /todos/:id',()=>{
    it('should update the todo',(done)=>{
        var hexID = todos[0]._id.toHexString()//grab id of first item
        var text = "updated via test"
        request(app)
        .patch(`/todos/${hexID}`) 
        .send({
            completed : true,
            text: text
            })//update text and set completed to true
        .expect(200)  // expect no error
        .expect((res)=>{
        //(text is changed updated & completed is true, completedAt is a (tobe) number). 
            expect(res.body.todo.text).toBe(text)
            expect(res.body.todo.completed).toBe(true)
            expect(typeof res.body.todo.completedAt).toBe('number')
        })
        .end(done)

    })
    it('should clear completedAt when todo is not completed (false)',(done)=>{
        var hexID = todos[1]._id.toHexString()//grab id of 2nd item
        var text = "updated via test for second item"
        request(app)
        .patch(`/todos/${hexID}`) 
        .send({//update text and set completed to true
            completed : false,
            text: text
            })
        .expect(200)  // expect no error
        .expect((res)=>{
            //(text is changed updated & completed is true, completedAt is null - toNotExist=tobefalsy()
                expect(res.body.todo.text).toBe(text)
                expect(res.body.todo.completed).toBe(false)
                expect(res.body.todo.completedAt).toBeFalsy()
            })
        .end(done)
    })
})